import { useNavigate } from 'react-router-dom'

function FoodCard({ product }) {
  const navigate = useNavigate()
  const { product_name, brands, nutriments, image_small_url, code } = product
  const calories = nutriments?.['energy-kcal_100g'] ?? nutriments?.energy_100g ?? '—'

  const handleClick = () => {
    navigate(`/product/${code}`)
  }

  return (
    <div className="food-card" onClick={handleClick}>
      <div className="food-card-header">
        <img src={image_small_url || 'https://via.placeholder.com/96'} alt={product_name || 'Food image'} />
        <div>
          <h3 className="food-card-title">{product_name || 'Unknown product'}</h3>
          <p className="food-card-subtitle">{brands || 'Unknown brand'}</p>
        </div>
      </div>
      <div className="food-card-details">
        <p className="food-card-detail">Energy: {calories} kcal</p>
        <p className="food-card-detail">Fat: {nutriments?.fat_100g ?? '—'} g</p>
        <p className="food-card-detail">Protein: {nutriments?.proteins_100g ?? '—'} g</p>
      </div>
    </div>
  )
}

export default FoodCard
