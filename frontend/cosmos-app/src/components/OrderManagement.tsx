import { FormEvent, useEffect, useState } from "react";
import { createOrder, getOrders } from "../service/OrderService";

const OrderManagement = () => {
  const [customerId, setCustomerId] = useState<number>();
  const [productId, setProductId] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [qty, setQty] = useState<number>();
  const [orders, setOrders] = useState<any[]>([]);

  const handleOrderSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("order submitted");
    try {
      const order = {
        customerId,
        items: [
          {
            productId,
            price,
            quantity: qty,
          },
        ],
      };
      const response = await createOrder(order);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchedOrders = async () => {
    try {
      const response = await getOrders();
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchedOrders();
  }, []);

  return (
    <>
      <h2>Order Management</h2>
      <p>create orders</p>
      {/* <form onSubmit={(event) => handleOrderSubmit(event)}> */}
      <form onSubmit={handleOrderSubmit}>
        <label htmlFor="customer_id">Customer ID</label>
        <input
          type="number"
          id="customer_id"
          name="customer_id"
          required
          value={customerId}
          onChange={(e) =>
            setCustomerId(
              e.target.value === "" ? undefined : Number(e.target.value)
            )
          }
        />
        <br />
        <br />
        <label htmlFor="product_id">Product ID</label>
        <input
          type="number"
          id="product_id"
          name="product_id"
          required
          value={productId}
          onChange={(e) =>
            setProductId(
              e.target.value === "" ? undefined : Number(e.target.value)
            )
          }
        />
        <br />
        <br />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          required
          value={price}
          onChange={(e) =>
            setPrice(e.target.value === "" ? undefined : Number(e.target.value))
          }
        />
        <br />
        <br />
        <label htmlFor="qty">QTY</label>
        <input
          type="number"
          id="qty"
          name="qty"
          required
          value={qty}
          onChange={(e) =>
            setQty(e.target.value === "" ? undefined : Number(e.target.value))
          }
        />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>

      <div>
        <h2>Order Details</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Order Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {orders && orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerId}</td>
                  <td>{order.createdAt.split('T')[0]}</td>
                  <td><button>Edit</button></td>
                  <td><button>View</button></td>
                </tr>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderManagement;
