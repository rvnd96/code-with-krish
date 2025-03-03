import axios from "axios";
import { CUSTOMER_ENDPOINT } from "./api";
import { Customer, CustomerPayload } from "../types";

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

const createCustomer = async (customerPayload: CustomerPayload) => {
  try {
    const response = await axios.post(CUSTOMER_ENDPOINT, customerPayload);
    return response.data;
  } catch (error) {
    throw new Error("Error creating customer");
  }
}

export { getAllCustomers, getOneCustomer, createCustomer };
