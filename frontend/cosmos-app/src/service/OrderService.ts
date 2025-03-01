//OrderService.ts
import axios from "axios";

const baseUrl = "http://localhost:3000/orders";

async function createOrder(order: any) {
  return axios.post(baseUrl, order);
}

async function getOrders() {
  return axios.get(baseUrl);
}

export { createOrder, getOrders };
