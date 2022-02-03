const initialState = {
  itemInfo: {
    img: "https://itslondon.s3.amazonaws.com/p/l/DEWDCH133NT.jpg",
    title: "Milwaukee M18 FN16GA-0X FUEL Angled Nail Gun 16 Gauge with C...",
    price: 300,
    id: 1,
  },
};
// =======================  //

const itemInfoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_ITEMINFO":
      return { itemInfo: payload };
    case "UPDATE_ARTICLE":
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

export const updateItemInfo = (updatedItemInfo) => {
  return { type: "UPDATE_ITEMINFO", payload: updatedItemInfo };
};
// =======================  //

// export const deleteItemInfo = (id) => {
//   return { type: "DELETE_ITEMINFO", payload: id };
// };
