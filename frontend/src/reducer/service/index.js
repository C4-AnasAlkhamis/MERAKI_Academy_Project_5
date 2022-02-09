/** @format */

const initialState = {
  services: [
    {
      id: 1,
      title: "Makita 6 Piece Slotted",
      description:
        "Makita 6 Piece Slotted, Pozi & Phillips Screwdriver Set (420898)",
      image: "https://itslondon.s3.amazonaws.com/p/m/MAKE10528.jpg",
    },
    {
      id: 2,
      title: "Makita 6 Piece Slotted",
      description:
        "Makita 6 Piece Slotted, Pozi & Phillips Screwdriver Set (420898)",
      image: "https://itslondon.s3.amazonaws.com/p/m/MAKE10528.jpg",
    },
    {
      id: 3,
      title: "Makita 6 Piece Slotted",
      description:
        "Makita 6 Piece Slotted, Pozi & Phillips Screwdriver Set (420898)",
      image: "https://itslondon.s3.amazonaws.com/p/m/MAKE10528.jpg",
    },
    {
      id: 4,
      title: "Makita 6 Piece Slotted",
      description:
        "Makita 6 Piece Slotted, Pozi & Phillips Screwdriver Set (420898)",
      image: "https://itslondon.s3.amazonaws.com/p/m/MAKE10528.jpg",
    },
  ],
  serviceInfo: {
    id: 4,
    title: "Makita 6 Piece Slotted",
    description:
      "Makita 6 Piece Slotted, Pozi & Phillips Screwdriver Set (420898)",
    image: "https://itslondon.s3.amazonaws.com/p/m/MAKE10528.jpg",
  },
};
// =======================  //

const serviceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_SERVICE":
      return { ...state, services: payload };

    case "SET_SERVICEINFO":
      return { ...state, serviceInfo: payload };

    case "ADD_SERVICE":
      return { ...state, services: [...state.services, payload] };

    case "DELETE_SERVICE":
      return {
        ...state,
        services: state.services.filter((service) => {
          return service.id !== payload;
        }),
      };
    case "UPDATE_SERVICE":
      return {
        ...state,
        services: state.services.map((service) => {
          if (service.id === payload.id) {
            return payload;
          }
          return service;
        }),
      };

    default:
      return state;
  }
};

export default serviceReducer;

export const setService = (services) => {
  return { type: "SET_SERVICE", payload: services };
};
// =======================  //
export const setServiceInfo = (servicesInfo) => {
  return { type: "SET_SERVICEINFO", payload: servicesInfo };
};
export const addService = (newService) => {
  return { type: "ADD_SERVICE", payload: newService };
};
// =======================  //

export const updateService = (newService) => {
  return { type: "UPDATE_SERVICE", payload: newService };
};
// =======================  //

export const deleteService = (id) => {
  return { type: "DELETE_SERVICE", payload: id };
};
