import { PulseLoader } from "react-spinners";

function LoaderUtility({ loading }) {
  const override = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: ".5rem",
    // borderColor: "olive",
    // backgroundColor: "red",
    // width: "100%",
  };
  return (
    <>
      <p className="utility-spinner">
        Loading
        <PulseLoader
          color="#9c27b0"
          loading={loading}
          cssOverride={override}
          size={3}
          className="pulse-loader"
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.5}
        />
      </p>
    </>
  );
}

function LoaderUtility1({ loading }) {
  const override = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: ".5rem",
    // borderColor: "olive",
    // backgroundColor: "red",
    // width: "100%",
  };
  return (
    <>
      <p className="utility-spinner">
        {/* Loading */}
        <PulseLoader
          color="#9c27b0"
          loading={loading}
          cssOverride={override}
          size={20}
          className="pulse-loader"
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.5}
        />
      </p>
    </>
  );
}

export default LoaderUtility;
export { LoaderUtility1 };
