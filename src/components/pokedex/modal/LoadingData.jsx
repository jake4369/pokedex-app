import rotomdexImg from "./../../../assets/rotomdex.png";

const LoadingData = () => {
  return (
    <div className="loading-data">
      <img src={rotomdexImg} alt="Rotomdex" className="rotomdex-img" />{" "}
      <p>Loading data...</p>
    </div>
  );
};

export default LoadingData;
