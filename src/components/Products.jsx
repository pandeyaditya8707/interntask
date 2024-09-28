import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../redux/actions/productActions';

function Products() {
  const [page, setPage] = useState(1); // Current page number
  const [perPage] = useState(10); // Number of products per page
  const [searchTerm, setSearchTerm] = useState(''); // Search term from input

  const products = useSelector((state) => state.products.products);
  const totalProducts = useSelector((state) => state.products.total); // Get total products from state
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const category = query.get('category') || '';
  const search = query.get('search') || '';
  const currentPage = parseInt(query.get('page')) || 1; // Get the current page from URL

  // Update state from URL on component mount
  useEffect(() => {
    setSearchTerm(search);
    setPage(currentPage);
  }, [search, currentPage]);

  // Calculate the offset (skip) based on page number
  const skip = (page - 1) * perPage;

  // Fetch products based on category, search, and skip
  useEffect(() => {
    dispatch(fetchProducts(category, search, skip, perPage));
  }, [dispatch, category, search, skip, perPage]);

  // Handle search input change and update URL
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page for new search
    navigate(`/?search=${e.target.value}&page=1`); // Remove category to show all
  };

  // Handle category change and update URL
  const handleCategoryChange = (category) => {
    setPage(1); // Reset to first page for new category
    if (category === 'All') {
      navigate(`/?search=${searchTerm}&page=1`); // Remove category to show all
    } else {
      navigate(`/?category=${category}&search=${searchTerm}&page=1`);
    }
  };

  // Handle pagination
  const nextPage = () => {
    if (page < totalPages) {
      const nextPageNumber = page + 1;
      setPage(nextPageNumber);
      navigate(`/?category=${category}&search=${searchTerm}&page=${nextPageNumber}`);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      const prevPageNumber = page - 1;
      setPage(prevPageNumber);
      navigate(`/?category=${category}&search=${searchTerm}&page=${prevPageNumber}`);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / perPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border border-gray-400 rounded"
          value={searchTerm}
          onChange={handleSearch} // Update search term on input change
        />
      </div>
      <ul className="grid grid-cols-2 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id} className="border p-4">
              <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover mb-2"/>
              <h3 className="font-bold">{product.title}</h3>
              <p>{product.description}</p>
              <p className="text-gray-500">${product.price}</p>
            </li>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </ul>
      <div className="mt-4 flex justify-between items-center">
        <button
          className="bg-gray-500 text-white p-2"
          onClick={prevPage}
          disabled={page === 1} // Disable the previous button if on the first page
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages} {/* Display current page and total pages */}
        </span>
        <button
          className="bg-blue-500 text-white p-2"
          onClick={nextPage}
          disabled={page === totalPages} // Disable the next button if on the last page
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
