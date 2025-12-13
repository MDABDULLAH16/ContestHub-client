 
import lottieJson from '../../assets/Trophy.json';
import Lottie from 'lottie-react';
const Loader = () => {
    return (
      <div className="w-48 h-48 mx-auto">
        <Lottie animationData={lottieJson} loop={true}  />
      </div>
    );
};

export default Loader;