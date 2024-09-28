import axios from 'axios';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';

export const fetchProducts = (category = '', search = '', skip = 0, limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    let url = '';
    if (search) {
      // Use search API if search term is present
      url = `https://dummyjson.com/products/search?q=${search}&skip=${skip}&limit=${limit}`;
    } else if (category) {
      // Use category API if category is selected
      url = `https://dummyjson.com/products/category/${category}?skip=${skip}&limit=${limit}`;
    } else {
      // Default products API without search or category
      url = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
    }

    console.log("Fetching products from:", url); // Log the URL for debugging
    const response = await axios.get(url);
    console.log("Fetched products:", response.data.products); // Log fetched products

    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: {
        products: response.data.products,
        total: response.data.total,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      error: error.message,
    });
    console.error("Error fetching products:", error.message); // Log error
  }
};
