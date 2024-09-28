import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../redux/actions/categoryActions';

import '../styles/Categories.css';

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const navigate = useNavigate();
  const listRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    if (category === 'All') {
      navigate('/'); // Show all products
    } else {
      navigate(`/?category=${category.slug}`);
    }
  };

  return (
    <div className="categories-container">
      <ul className="categories-list flex" ref={listRef}>
        <li
          key="all"
          className="category-item mx-2 px-4 py-2 cursor-pointer hover:bg-gray-600 rounded"
          onClick={() => handleCategorySelect('All')}
        >
          All
        </li>
        {categories.map((category) => (
          <li
            key={category.slug}
            className="category-item mx-2 px-4 py-2 cursor-pointer hover:bg-gray-600 rounded"
            onClick={() => handleCategorySelect(category)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
