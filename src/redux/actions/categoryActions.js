import axios from 'axios';

// Action types
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

// Action to fetch categories
export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: FETCH_CATEGORIES_REQUEST });
  try {
    // Fetch data from the correct API endpoint
    const response = await axios.get('https://dummyjson.com/products/categories');
    console.log('Categories Fetched:', response.data); // Debugging

    // Dispatch the data to the Redux store
    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    dispatch({
      type: FETCH_CATEGORIES_FAILURE,
      error: error.message,
    });
  }
};
