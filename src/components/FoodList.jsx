import FoodCard from './FoodCard'

function FoodList({ products }) {
  return (
    <div className="food-list">
      {products.map((product) => (
        <FoodCard key={product.code} product={product} />
      ))}
    </div>
  )
}

export default FoodList
