import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import ErrorMessage from '../components/ErrorMessage'
import useFoodSearch from '../hooks/useFoodSearch'

function HomePage() {
  const [hasSearched, setHasSearched] = useState(false)
  const { results, loading, error, searchFood } = useFoodSearch()

  const handleSearch = async (query) => {
    setHasSearched(true)
    await searchFood(query)
  }

  return (
    <div className="page">
      <h2>Search Nutrition Info</h2>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="status-message">Loading results...</p>}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && !hasSearched && (
        <p className="status-message">Search for a food like "banana", "oats", or "yogurt" to get started.</p>
      )}
      {!loading && hasSearched && results.length === 0 && (
        <p className="status-message">No results found. Try a different food name.</p>
      )}
      {!loading && results.length > 0 && <FoodList products={results} />}
    </div>
  )
}

export default HomePage
