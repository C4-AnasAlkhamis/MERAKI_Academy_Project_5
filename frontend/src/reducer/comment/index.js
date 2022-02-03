const initialState = {
  comments: [],
};

const commentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_COMMENT":
      return { ...state, comments: [...state.comments, payload] };
    case "SET_COMMENT":
      return { ...state, comments: payload };
    default:
      return state;
  }
};
export default commentsReducer;

//   ===========================

export const addComments = (newComment) => {
  return { type: "ADD_COMMENT", payload: newComment };
};
//   ===========================

export const setComments = (Comments) => {
  return { type: "SET_COMMENT", payload: Comments };
};
