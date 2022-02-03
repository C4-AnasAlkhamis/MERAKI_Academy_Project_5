const initialState = {
  items: [],

};
// =======================  //

const itemsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_ITEMS":
      return { ...state, items: payload };
    case "ADD_ITEM":
      return { ...state, items: [...state.items, payload] };
    default:
      return state;
  }
};

export default itemsReducer;

// =======================  //

export const setItems = (items) => {
  return { type: "SET_ITEMS", payload: items };
};
// =======================  //

export const addItem = (newItem) => {
  return { type: "ADD_ITEM", payload: newItem };
};
// =======================  //

