const initialState = {
  carts: [],

};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // case "ADD_CART":
    //   return { ...state, carts: [...state.carts, payload] };

    case "SET_CART":
      return { carts: [...payload] };

      case "DELETE_CART":
        return {carts: state.carts.filter((cart) => cart._id !== payload._id),
        };
    default:
      return state;
  }
};
export default cartReducer;

//   ===========================
export const setCart = (carts) => {
  return { type: "SET_CART", payload: carts };
};

// export const addCart = (newCart) => {
//   return { type: "ADD_CART", payload: newCart };
// };
//   ===========================

export const deleteCart = (cart) => {
  return { type: "DELETE_CART", payload: cart };
};
