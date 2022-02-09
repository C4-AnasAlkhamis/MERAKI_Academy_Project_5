import { useSelector, useDispatch } from "react-redux";

const WSInfo = () => {
  const { token, workers } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      workers: state.workerReducer.workers,
    };
  });
  console.log(workers);
  return (
    <>
      <h1>ServiceInfo</h1>
      {workers.map((worker, index) => {
        return (
          <div key={index}>
            <img src={worker.image} alt={worker.name} />
            <small>{worker.phone}</small>
            <address>{worker.address}</address>
          </div>
        );
      })}
    </>
  );
};

export default WSInfo;
