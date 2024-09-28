import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from './redux/actions/categoryActions';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import Products from './components/Products';
import SearchBar from './components/SearchBar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">E-Commerce App</h1>
        <Categories />
        <Routes>
          <Route path="/" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
