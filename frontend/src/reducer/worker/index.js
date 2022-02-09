/** @format */

const initialState = {
  worker: {},
};
// =======================  //

const workerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_WORKER":
      return { worker: payload };

    default:
      return state;
  }
};

export default workerReducer;

// =======================  //

export const setUsers = (worker) => {
  return { type: "SET_WORKER", payload: worker };
};
// =======================  //

