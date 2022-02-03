const initialState = {
  itemInfo: {
    img: "https://itslondon.s3.amazonaws.com/p/l/DEWDCH133NT.jpg",
    title: "Milwaukee M18 FN16GA-0X FUEL Angled Nail Gun 16 Gauge with C...",
    price: 300,
  },
};
// =======================  //

const itemInfoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_ITEMINFO":
      return { itemInfo: payload };
    default:
      return state;
  }
};

export default itemInfoReducer;

// =======================  //

export const setItemInfo = (ItemInfo) => {
  return { type: "SET_ITEMINFO", payload: ItemInfo };
};
// =======================  //

// export const addArticle = (newArticle) => {
//   return { type: "ADD_ARTICLE", payload: newArticle };
// };
// // =======================  //

// export const updateItemInfo = (updatedItemInfo) => {
//   return { type: "UPDATE_ITEMINFO", payload: updatedItemInfo };
// };
// =======================  //

// export const deleteArticles = (id) => {
//   return { type: "DELETE_ARTICLE", payload: id };
// };
