/** @format */

const initialState = {
  workers: [],
};
// =======================  //

const workerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_WORKER":
      return { ...state, workers: payload };
      
    case "DELETE_WORKER":
      return {
        ...state,
        workers: state.workers.filter((worker) => {
          return worker.id !== payload;
        }),
      };

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
export const deleteWorkers = (id) => {
  return { type: "DELETE_WORKER", payload: id };
};
// =======================  //
