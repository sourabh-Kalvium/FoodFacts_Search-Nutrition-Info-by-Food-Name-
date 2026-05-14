import FoodCard from './FoodCard'

function FoodList({ products }) {
  if (!products || products.length === 0) {
    return <p className="empty-state">No results found. Try a different search.</p>
  }

  return (
    <div className="food-list">
      {products.map((product) => (
        <FoodCard key={product.code ?? product._id ?? product.id} product={product} />
      ))}
    </div>
  )
}

export default FoodList
