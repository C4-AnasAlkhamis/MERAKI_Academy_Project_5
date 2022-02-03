const initialState = {
  itemInfo: [],
};
// =======================  //

const itemInfoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_ITEMINFO":
      return { itemInfo: payload };
    // case "ADD_ARTICLE":
    //   return { ...state, articles: [...state.articles, payload] };
    // case "UPDATE_ITEMINFO":
    //   return {
    //     ...state,
    //     articles: state.articles.map((article) => {
    //       if (article.id === payload.id) {
    //         return payload;
    //       }
    //       return article;
    //     }),
    //   };
    // case "DELETE_ARTICLE":
    //   return {
    //     ...state,
    //     articles: state.articles.filter((article) => {
    //       return article.id !== payload;
    //     }),
    //   };
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

export const updateItemInfo = (updatedItemInfo) => {
  return { type: "UPDATE_ITEMINFO", payload: updatedItemInfo };
};
// =======================  //

// export const deleteArticles = (id) => {
//   return { type: "DELETE_ARTICLE", payload: id };
// };
