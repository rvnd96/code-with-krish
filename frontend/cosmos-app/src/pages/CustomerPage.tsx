import { Link } from "react-router-dom";
import CustomerTable from "../components/CustomerTable";

const CustomerPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between w-full flex-row mb-5">
        <h1 className="text-4xl pb-4 pt-0">Manage Customers</h1>
        <Link to={'/customers/add'} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 uppercase font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          add
        </Link>
      </div>
      <CustomerTable />
    </div>
  );
};

export default CustomerPage;
