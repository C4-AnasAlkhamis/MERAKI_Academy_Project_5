const initialState = {
  cart: {
    
  },

};
// =======================  //

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_ARTICLES":
      return { ...state, articles: payload };
    case "ADD_ARTICLE":
      return { ...state, articles: [...state.articles, payload] };
    case "UPDATE_ARTICLE":
      return {
        ...state,
        articles: state.articles.map((article) => {
          if (article.id === payload.id) {
            return payload;
          }
          return article;
        }),
      };
    case "DELETE_ARTICLE":
      return {
        ...state,
        articles: state.articles.filter((article) => {
          return article.id !== payload;
        }),
      };
    default:
      return state;
  }
};

export default cartReducer;

// =======================  //

export const setArticles = (articles) => {
  return { type: "SET_ARTICLES", payload: articles };
};
// =======================  //

export const addArticle = (newArticle) => {
  return { type: "ADD_ARTICLE", payload: newArticle };
};
// =======================  //

export const updateArticles = (updatedArticle) => {
  return { type: "UPDATE_ARTICLE", payload: updatedArticle };
};
// =======================  //

export const deleteArticles = (id) => {
  return { type: "DELETE_ARTICLE", payload: id };
};
