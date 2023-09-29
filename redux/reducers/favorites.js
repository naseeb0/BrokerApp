// redux/reducers/favorites.js
const initialState = [];

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.payload];
    case 'REMOVE_FAVORITE':
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
};

export default favoritesReducer;
