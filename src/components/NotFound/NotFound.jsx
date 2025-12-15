import { Link } from "react-router";
import Lottie from "lottie-react";
import notfound from "../../assets/404.json";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie
        animationData={notfound}
        loop={true}
        autoplay={true}
        style={{ width: "350px", height: "350px" }}
      />
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Page Not Found</h1>
        <p className="text-gray-500 px-2 ">
          Sorry, the page you are looking for doesn’t exist.
        </p>

        <Link to="/" className="mt-2">
          <button className="btn btn-primary px-8">Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
