/** @format */

const initialState = {
  workers: [],
};
// =======================  //

const workerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_WORKER":
      return { ...state, workers: payload };

    default:
      return state;
  }
};

export default workerReducer;

// =======================  //

export const setWorkers = (workers) => {
  return { type: "SET_WORKER", payload: workers };
};
// =======================  //
