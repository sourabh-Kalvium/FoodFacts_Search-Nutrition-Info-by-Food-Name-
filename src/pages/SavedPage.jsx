import { useNavigate } from 'react-router-dom'

function SavedPage({ saved, dispatch }) {
  const navigate = useNavigate()

  if (saved.length === 0) {
    return (
      <div className="page">
        <h2>Saved Items</h2>
        <p className="empty-state">You haven't saved anything yet. Search for a food and save it from the detail page.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>Saved Items ({saved.length})</h2>
      <div className="food-list">
        {saved.map((product) => (
          <div key={product.code} className="saved-item">
            <div className="saved-item-header">
              <div>
                <h3 className="saved-item-title">{product.product_name || 'Unnamed product'}</h3>
                <p className="saved-item-brand">{product.brands || 'Unknown brand'}</p>
              </div>
              <div className="saved-item-actions">
                <button className="button-secondary" onClick={() => navigate(`/product/${product.code}`)}>
                  View Details
                </button>
                <button className="button" onClick={() => dispatch({ type: 'REMOVE', code: product.code })}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedPage
