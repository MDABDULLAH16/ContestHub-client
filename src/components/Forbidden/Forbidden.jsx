import Lottie from "lottie-react";
import React from "react";
import forbiddenData from "../../assets/forbidden403.json";
import { Link } from "react-router";
const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie
        animationData={forbiddenData}
        loop={true}
        autoplay={true}
        style={{ width: "300px", height: "300px" }}
      />

      <Link className="btn btn-primary text-black" to="/dashboard">
        Go To Dashboard
      </Link>
    </div>
  );
};

export default Forbidden;
