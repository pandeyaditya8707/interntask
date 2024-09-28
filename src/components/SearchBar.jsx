import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/?search=${searchInput}`);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Search for products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button
        className="mt-2 bg-blue-500 text-white p-2"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
