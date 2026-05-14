function FoodCard({ product }) {
  const { product_name, brands, nutriments, image_small_url } = product

  return (
    <article className="food-card">
      {image_small_url ? (
        <img src={image_small_url} alt={product_name ?? 'Food item'} />
      ) : (
        <div className="food-card__placeholder">No image</div>
      )}

      <div className="food-card__body">
        <h2>{product_name || 'Unknown product'}</h2>
        <p className="food-card__brand">{brands || 'Unknown brand'}</p>

        <div className="food-card__nutrition">
          <p>Calories: {nutriments?.['energy-kcal_100g'] ?? 'N/A'} kcal</p>
          <p>Protein: {nutriments?.proteins_100g ?? 'N/A'} g</p>
          <p>Carbs: {nutriments?.carbohydrates_100g ?? 'N/A'} g</p>
          <p>Fat: {nutriments?.fat_100g ?? 'N/A'} g</p>
        </div>
      </div>
    </article>
  )
}

export default FoodCard
