const initialState = {
  loading: false,
  products: [],
  total: 0,
  error: '',
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        loading: false,
        products: action.payload.products, // Update products
        total: action.payload.total, // Update total products
      };
    case 'CLEAR_PRODUCTS':
      return {
        ...state,
        products: [], // Clear products
      };
    case 'FETCH_PRODUCTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default productReducer;
