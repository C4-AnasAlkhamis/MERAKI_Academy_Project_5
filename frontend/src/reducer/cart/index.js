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
      return {
        carts: state.carts.filter((cart) => {
          return cart.cart_id !== payload;
        }),
      };
    default:
      return state;
  }
};
export default cartReducer;

// export const addCart = (newCart) => {
//   return { type: "ADD_CART", payload: newCart };
// };
//   ===========================
export const setCart = (carts) => {
  return { type: "SET_CART", payload: carts };
};

export const deleteCart = (id) => {
  return { type: "DELETE_CART", payload: id };
};

///////////////////////
