/** @format */

const initialState = {
  services: [],
};
// =======================  //

const serviceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_SERVICE":
      return { ...state, items: payload };

    case "ADD_SERVICE":
      return { ...state, items: [...state.items, payload] };

    case "DELETE_SERVICE":
      return {
        ...state,
        items: state.items.filter((item) => {
          return item.id !== payload;
        }),
      };
    case "UPDATE_SERVICE":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === payload.id) {
            return payload;
          }
          return item;
        }),
      };

    default:
      return state;
  }
};

export default serviceReducer;
