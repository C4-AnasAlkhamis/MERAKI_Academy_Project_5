const initialState = {
  carts: [
    {
      image: "https://itslondon.s3.amazonaws.com/p/l/DEWDCH133NT.jpg",
      title: "Milwaukee M18 FN16GA-0X FUEL Angled Nail Gun 16 Gauge with C...",
      description:
        "Milwaukee M18 FN16GA-0X FUEL Angled Nail Gun 16 Gauge with C...",
      price: 300,
      category: 1,
      id: 2,
    },
  ],
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // case "ADD_CART":
    //   return { ...state, carts: [...state.carts, payload] };

    case "SET_CART":
      return { carts: [...payload, payload] };

    case "DELETE_CART":
      return { carts: state.carts.filter((cart) => cart.id !== payload.id) };
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

export const deleteCart = (cart) => {
  return { type: "DELETE_CART", payload: cart };
};
