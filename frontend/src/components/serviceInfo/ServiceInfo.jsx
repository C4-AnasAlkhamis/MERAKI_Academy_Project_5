import { useSelector, useDispatch } from "react-redux";

const WSInfo = () => {
  const { token, workers } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      workers: state.workerReducer.workers,
    };
  });
  return <div>ServiceInfo</div>;
};

export default WSInfo;
