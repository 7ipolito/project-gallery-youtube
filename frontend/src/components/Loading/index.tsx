import Lottie from "lottie-react";

import loadingAnimation from './loading.json'

const Loading = () => {

  return (
    <div className="flex items-center justify-center">
    <Lottie animationData={loadingAnimation} />
    </div>
  );
};

export default Loading;
