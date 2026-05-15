import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from '../components/ErrorMessage'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isSaved = saved.some((item) => item.code === barcode)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
        )
        if (!cancelled) {
          setProduct(response.data.product || null)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Could not load product details. Please try a different item or try again later.')
          setProduct(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  const handleSaveToggle = () => {
    if (!product) return
    if (isSaved) {
      dispatch({ type: 'REMOVE', code: barcode })
    } else {
      dispatch({ type: 'ADD', product })
    }
  }

  if (loading) {
    return <p className="status-message">Loading product details...</p>
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!product) {
    return <p className="status-message">Product not found.</p>
  }

  const nutriments = product.nutriments || {}
  const detailItems = [
    { label: 'Energy', value: nutriments['energy-kcal_100g'] ?? nutriments['energy_100g'] ?? '—' },
    { label: 'Fat', value: nutriments.fat_100g ?? '—' },
    { label: 'Saturated Fat', value: nutriments['saturated-fat_100g'] ?? '—' },
    { label: 'Carbohydrates', value: nutriments.carbohydrates_100g ?? '—' },
    { label: 'Sugars', value: nutriments.sugars_100g ?? '—' },
    { label: 'Proteins', value: nutriments.proteins_100g ?? '—' },
    { label: 'Salt', value: nutriments.salt_100g ?? '—' },
  ]

  return (
    <div className="detail-page">
      <button className="button-secondary" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="detail-header">
        <div className="detail-header-top">
          <img src={product.image_small_url || 'https://via.placeholder.com/120'} alt={product.product_name || 'Product image'} />
          <div>
            <h2>{product.product_name || 'Unnamed product'}</h2>
            <p className="food-card-subtitle">{product.brands || 'Unknown brand'}</p>
            {product.quantity && <p className="food-card-detail">Quantity: {product.quantity}</p>}
          </div>
        </div>
        <p>{product.generic_name || product.categories || ''}</p>
      </div>

      <div className="nutrition-table">
        <h3>Nutrition per 100g</h3>
        {detailItems.map((item) => (
          <div key={item.label} className="nutrition-row">
            <span className="nutrition-label">{item.label}</span>
            <span className="nutrition-value">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="detail-actions">
        <button className="button" onClick={handleSaveToggle}>
          {isSaved ? '★ Remove from Saved' : '☆ Save to My List'}
        </button>
      </div>
    </div>
  )
}

export default DetailPage
