/** @format */

const initialState = {
  items: [],
  categories: [],
};
// =======================  //

const itemsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_ITEMS":
      return { ...state, items: payload };

    case "ADD_ITEM":
      return { ...state, items: [...state.items, payload] };

    case "SET_CATEGORIES":
      return { ...state, categories: payload };
    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, payload] };

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((category) => {
          return category.id !== payload;
        }),
      };
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
export const addCategory = (newCategory) => {
  return { type: "ADD_CATEGORY", payload: newCategory };
};
// =======================  //

export const setCategories = (categories) => {
  return { type: "SET_CATEGORIES", payload: categories };
};
// =======================  //
export const deleteCategory = (id) => {
  return { type: "DELETE_CATEGORY", payload: id };
};
// =======================  //
