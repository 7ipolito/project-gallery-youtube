import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-4">Page not found</p>
        <Link to={'/'}>
          <a className="text-black hover:text-red-800">Back to homepage</a>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
