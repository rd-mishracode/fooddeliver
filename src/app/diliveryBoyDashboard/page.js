"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DiliveryBoyHeader from "../diliveryBoyHeader";
import CustomerFooter from "../_component/customerFooter";

const Page = () => {
  const router = useRouter();
  const [myOrders, setMyOrders] = useState([]);
  const [statusValues, setStatusValues] = useState({});

  useEffect(() => {
    const dilivery = JSON.parse(localStorage.getItem("dilivery"));
    if (!dilivery) {
      router.push("/dileverypatner");
    }
  }, []);

  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    const deliveryBoyData = JSON.parse(localStorage.getItem("dilivery"))._id;
    let response = await fetch(
      `http://localhost:3000/api/diliveryPatners/orders/${deliveryBoyData}`
    );
    response = await response.json();
    if (response.success) {
      setMyOrders(response.result);
    }
  };

  const handleStatusChange = async (orderId) => {
    const newStatus = statusValues[orderId];
    const response = await fetch(
      `http://localhost:3000/api/diliveryPatners/orders/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const result = await response.json();
    console.log(result);

    if (result.success) {
      // Update the state to reflect the status change
      setMyOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } else {
      console.error(result.message);
    }
  };

  const handleStatusSelectChange = (orderId, newStatus) => {
    setStatusValues((prevStatusValues) => ({
      ...prevStatusValues,
      [orderId]: newStatus,
    }));
  };

  return (
    <div>
      <DiliveryBoyHeader />
      <h1>My Order List</h1>
      {myOrders &&
        myOrders.map((item) => (
          <div
            key={item._id}
            className="restaurant-wrapper"
            style={{ marginLeft: "auto", marginRight: "auto" }}>
            <h4>Name-{item.data.restaurantName}</h4>
            <div>Amount-{item.amount}</div>
            <div>Address-{item.data.address}</div>
            <div>
              Status:
              <select
                value={statusValues[item._id] || item.status}
                onChange={(e) =>
                  handleStatusSelectChange(item._id, e.target.value)
                }>
                <option value="Pending">Pending</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button onClick={() => handleStatusChange(item._id)}>
                Change Status
              </button>
            </div>
          </div>
        ))}
      <CustomerFooter />
    </div>
  );
};

export default Page;
