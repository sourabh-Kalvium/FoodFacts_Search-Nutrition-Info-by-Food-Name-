import { useState } from 'react'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'
import './App.css'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query) => {
    setHasSearched(true)
    setLoading(true)

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        query,
      )}&json=1&page_size=10`
      const response = await fetch(url)
      const data = await response.json()
      const products = Array.isArray(data.products) ? data.products : []
      const filtered = products.filter(
        (product) => product.product_name && product.product_name.trim() !== '',
      )

      setResults(filtered)
    } catch (error) {
      console.error('Something went wrong:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">FoodFacts</p>
          <h1>Search nutrition info by food name</h1>
        </div>
      </header>

      <main>
        <SearchBar onSearch={handleSearch} />

        {loading && <p className="status-message">Loading results...</p>}

        {!loading && !hasSearched && (
          <p className="status-message">
            Search for a food like "banana", "oats", or "peanut butter" to see
            nutrition cards.
          </p>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <p className="status-message">
            No results found. Try a different food name.
          </p>
        )}

        {!loading && results.length > 0 && <FoodList products={results} />}
      </main>
    </div>
  )
}

export default App
