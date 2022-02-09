import { useSelector, useDispatch } from "react-redux";

const ServiceInfo = () => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      service: state.serviceReducer.serviceInfo,
    };
  });

  return <div>ServiceInfo</div>;
};
