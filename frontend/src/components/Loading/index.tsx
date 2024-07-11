import Lottie from 'lottie-react';

import loadingAnimation from './loading.json';

const Loading = () => {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <Lottie animationData={loadingAnimation} />
    </div>
  );
};

export default Loading;
