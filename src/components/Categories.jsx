import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../redux/actions/categoryActions';

import '../styles/Categories.css';

function Categories() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories.categories);
  const navigate = useNavigate();

  // Adding a default 'All' category
  const categories = [{ slug: 'all', name: 'All' }, ...category]; 

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    if (category.name === 'All') {
      navigate('/'); // Show all products
    } else {
      navigate(`/?category=${category.slug}`); // Corrected the interpolation
    }
  };

  return (
    <div className="scrollmenu">
      {categories.map((category) => (
        <a
          key={category.slug}
          className="category-item"
          onClick={() => handleCategorySelect(category)}
        >
          {category.name}
        </a>
      ))}
    </div>
  );
}

export default Categories; // Corrected the export statement
