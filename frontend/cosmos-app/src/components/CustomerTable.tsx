import { useEffect, useState } from "react";
import { Customer } from "../types";
import { getAllCustomers, getOneCustomer } from "../service/CustomerService";

const CustomerTable = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const getCustomers = async () => {
    try {
      setLoading(true);
      const res = await getAllCustomers();
      setCustomers(res);
    } catch (error) {
      setError("Failed to get all customers");
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCustomer = async (id: number) => {
    try {
      setLoading(true);
      const customer = await getOneCustomer(id);
      setSelectedCustomer(customer);
    } catch (error) {
      setError("Failed to get one customers");
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    document.getElementById("default-modal")?.classList.add("hidden");
    setSelectedCustomer(null);
  };

  useEffect(() => {
    if (selectedCustomer) {
      document.getElementById("default-modal")?.classList.remove("hidden");
    }
  }, [selectedCustomer]);

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              NAME
            </th>
            <th scope="col" className="px-6 py-3">
              EMAIL
            </th>
            <th scope="col" className="px-6 py-3">
              ADDRESS
            </th>
            <th scope="col" className="px-6 py-3">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, i) => (
            <tr
              key={i}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {customer?.id}
              </th>
              <td className="px-6 py-4">{customer?.name}</td>
              <td className="px-6 py-4">{customer?.email}</td>
              <td className="px-6 py-4">
                {customer?.address ? customer?.address : "N/A"}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleViewCustomer(customer.id)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCustomer && (
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Customer Details
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <strong>ID:</strong> {selectedCustomer.id}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <strong>Name:</strong> {selectedCustomer.name}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <strong>Email:</strong> {selectedCustomer.email}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <strong>Address:</strong> {selectedCustomer.address || "N/A"}
                </p>
              </div>

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
