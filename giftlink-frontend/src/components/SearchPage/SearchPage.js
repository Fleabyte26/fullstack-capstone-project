import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlConfig } from "../../config"; // ✅ Corrected import

const SearchPage = () => {
  const navigate = useNavigate();

  // -----------------------------
  // State
  // -----------------------------
  const [searchQuery, setSearchQuery] = useState("");
  const [ageRange, setAgeRange] = useState(6);
  const [searchResults, setSearchResults] = useState([]);

  const bearerToken = sessionStorage.getItem('auth-token');

  // Example categories & conditions
  const categories = ["Toys", "Books", "Clothes", "Electronics"];
  const conditions = ["New", "Used", "Like New"];

  // -----------------------------
  // Search handler
  // -----------------------------
  const handleSearch = async () => {
    const baseUrl = `${urlConfig.backendUrl}/api/search?`;

    const queryParams = new URLSearchParams({
      name: searchQuery,
      age_years: ageRange,
      category: document.getElementById("categorySelect").value,
      condition: document.getElementById("conditionSelect").value,
    }).toString();

    try {
      const response = await fetch(`${baseUrl}${queryParams}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken ? `Bearer ${bearerToken}` : "",
        },
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  };

  // -----------------------------
  // Navigation
  // -----------------------------
  const goToDetailsPage = (productId) => {
    navigate(`/app/product/${productId}`);
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="container mt-4">
      <h2>Search Gifts</h2>

      {/* Search Input */}
      <div className="form-group my-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Dropdown */}
      <label htmlFor="categorySelect">Category</label>
      <select id="categorySelect" className="form-control my-1">
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Condition Dropdown */}
      <label htmlFor="conditionSelect">Condition</label>
      <select id="conditionSelect" className="form-control my-1">
        <option value="">All</option>
        {conditions.map((condition) => (
          <option key={condition} value={condition}>
            {condition}
          </option>
        ))}
      </select>

      {/* Age Range Slider */}
      <label htmlFor="ageRange">Less than {ageRange} years</label>
      <input
        type="range"
        className="form-control-range"
        id="ageRange"
        min="1"
        max="10"
        value={ageRange}
        onChange={(e) => setAgeRange(e.target.value)}
      />

      {/* Search Button */}
      <button className="btn btn-primary mt-3" onClick={handleSearch}>
        Search
      </button>

      {/* Results */}
      <div className="search-results mt-4">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div key={product.id} className="card mb-3">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description.slice(0, 100)}...</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => goToDetailsPage(product.id)}
                >
                  View More
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info" role="alert">
            No products found. Please revise your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
