import React, { useState } from "react";

function SearchCoasters() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); // Ensure results is always initialized as an array
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/search-coasters?query=${encodeURIComponent(
          query
        )}`
      );

      // Check if the response was successful
      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("frontend", data); // Log the response data for debugging

      // Use optional chaining and fallback to an empty array to ensure safety
      setResults(data["hydra:member"] ?? []);
    } catch (error) {
      console.error("Fetch error: ", error);
      setResults([]); // Reset results on error
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for coasters..."
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      <div>
        {/* Use optional chaining with ?. to safely access map function */}
        {results?.map((coaster, index) => (
          <div key={index}>
            <h2>{coaster.name}</h2>
            <p>Park: {coaster.park.name}</p>{" "}
            {/* Use optional chaining here too */}
            <p>Manufacturer: {coaster.manufacturer}</p>
            <p>Height: {coaster.Height}m</p>
            <p>Speed: {coaster.Speed}km/h</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchCoasters;
