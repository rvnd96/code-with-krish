import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Welcome to Order Management System
      </h1>
      <div className="inline-flex rounded-md shadow-xs">
        <Link
          to="/orders"
          aria-current="page"
          className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Orders
        </Link>

        <Link
          to="/customers"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Customers
        </Link>
        <Link
          to="/products"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Products
        </Link>
      </div>
    </div>
  );
};

export default Home;
