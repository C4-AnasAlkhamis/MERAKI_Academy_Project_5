import { useSelector, useDispatch } from "react-redux";

const ServiceInfo = () => {
  const { token, service } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      service: state.serviceReducer.serviceInfo,
    };
  });

  return <div>ServiceInfo</div>;
};
