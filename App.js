import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=YOUR_API_KEY`
      );
      const places = response.data.results;
      const analyzedResults = places.map((place) => ({
        name: place.name,
        rating: place.rating,
        userRatingsTotal: place.user_ratings_total,
      }));
      setResults(analyzedResults);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Review Analyzer</h1>
      <input
        type="text"
        placeholder="Search for restaurants, hotels, etc."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchReviews} disabled={loading}>
        {loading ? 'Analyzing...' : 'Search'}
      </button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <h3>{result.name}</h3>
            <p>Rating: {result.rating}</p>
            <p>Total Reviews: {result.userRatingsTotal}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
