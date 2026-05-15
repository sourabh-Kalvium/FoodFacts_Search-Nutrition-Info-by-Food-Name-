import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      onSearch(trimmed)
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label htmlFor="food-search" className="sr-only">
        Search for a food
      </label>
      <input
        id="food-search"
        type="text"
        placeholder="Search for a food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar
