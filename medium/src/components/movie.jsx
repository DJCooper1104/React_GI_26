import React, { useState } from "react";

// import "./App.css";


const MovieSearchComponent = () => {
  // State hooks to manage search input, fetched data, loading state, and error state
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Fetch data based on the search query when the user submits the form
  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    // Set state for hooks
    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${searchQuery}&apikey=83837f36`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Parsing response into JSON
      const result = await response.json();

      if (result.Response === "True") {
        setMovies(result.Search);
      } else {
        setError("No movies found. Please try another search.");
      }
    } catch (err) {
      setError(err.message); // Capture and set error message if request fails
    } finally {
      setLoading(false); // Set loading state to false after the fetch completes
    }
  };

  return (
    <div>
      <h1>Movie Search</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading, Error, and Data display */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!error && movies.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {movies.map((movie, index) => (
              <li key={index}>
                {movie.Title} ({movie.Year})
                <br />
                <img
                  src={
                    movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"
                  }
                  alt={movie.Title}
                  style={{ width: "100px", height: "150px" }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieSearchComponent;
