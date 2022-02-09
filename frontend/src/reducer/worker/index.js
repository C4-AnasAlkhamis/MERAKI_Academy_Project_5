/** @format */

const initialState = {
  workers: [
    {
      id: 1,
      address: "Set (420898)",
      phone: 100000000,
      image: "https://itslondon.s3.amazonaws.com/p/m/MAKE10528.jpg",
      name: "anas",
    },
    {
      id: 2,
      address: "Set (420898)",
      phone: 100000000,
      image: "https://itslondon.s3.amazonaws.com/p/m/MAKE10528.jpg",
      name: "anas",
    },
  ],
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

export const setWorker = (worker) => {
  return { type: "SET_WORKER", payload: worker };
};
// =======================  //
