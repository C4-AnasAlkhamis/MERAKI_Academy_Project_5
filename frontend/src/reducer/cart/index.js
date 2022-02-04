const initialState = {
  carts: [],
<<<<<<< HEAD

=======
>>>>>>> cd486c44e3527e8f291e725a464b0721c8d393a5
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // case "ADD_CART":
    //   return { ...state, carts: [...state.carts, payload] };

    case "SET_CART":
      return { carts: [...payload] };

<<<<<<< HEAD
      case "DELETE_CART":
        return {carts: state.carts.filter((cart) => cart._id !== payload._id),
        };
=======
    case "DELETE_CART":
      return {
        carts: state.carts.filter((cart) => {
          return cart.cart_id !== payload;
        }),
      };
>>>>>>> cd486c44e3527e8f291e725a464b0721c8d393a5
    default:
      return state;
  }
};
export default cartReducer;

<<<<<<< HEAD
//   ===========================
export const setCart = (carts) => {
  return { type: "SET_CART", payload: carts };
};

=======
>>>>>>> cd486c44e3527e8f291e725a464b0721c8d393a5
// export const addCart = (newCart) => {
//   return { type: "ADD_CART", payload: newCart };
// };
//   ===========================
<<<<<<< HEAD

export const deleteCart = (cart) => {
  return { type: "DELETE_CART", payload: cart };
};
=======
export const setCart = (carts) => {
  return { type: "SET_CART", payload: carts };
};

export const deleteCart = (id) => {
  return { type: "DELETE_CART", payload: id };
};

///////////////////////
>>>>>>> cd486c44e3527e8f291e725a464b0721c8d393a5
