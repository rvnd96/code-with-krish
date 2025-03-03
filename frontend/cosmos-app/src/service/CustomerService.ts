import axios from "axios";
import { CUSTOMER_ENDPOINT } from "./api";

const getAllCustomers = async () => {
  try {
    const response = await axios.get(CUSTOMER_ENDPOINT);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching customers");
  }
};

const getOneCustomer = async (id: number) => {
  try {
    const response = await axios.get(`${CUSTOMER_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error getting single customer");
  }
};

// const createCustomer = async ()

export { getAllCustomers, getOneCustomer };
