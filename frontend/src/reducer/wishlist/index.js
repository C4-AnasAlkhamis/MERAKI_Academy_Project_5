const initialState = {
  wishlists: [],
};

const wishlistReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_WISHLIST":
      return { wishlists: [...payload] };

    case "DELETE_WISHLIST":
      return {
        wishlists: state.wishlists.filter(
          (wishlist) => wishlist._id !== payload._id
        ),
      };
    default:
      return state;
  }
};
export default wishlistReducer;

export const setWishlist = (wishlists) => {
  return { type: "SET_WISHLIST", payload: wishlists };
};

export const deleteWishlist = (wishlist) => {
  return { type: "DELETE_WISHLIST", payload: wishlist };
};
