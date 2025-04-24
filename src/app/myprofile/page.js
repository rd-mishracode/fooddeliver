"use client";
import { useEffect, useState } from "react";
import CustomerFooter from "../_component/customerFooter";
import CustomerHeader from "../_component/customerHeader";

const page = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    getMyAllOrders();
  }, []);
  const getMyAllOrders = async () => {
    const getUserId = JSON.parse(localStorage.getItem("user"));
    const userid = getUserId._id;
    console.log(userid);
    let response = await fetch(`http://localhost:3000/api/order?id=${userid}`);
    response = await response.json();
    if (response.success) {
      setMyOrders(response.result);
    }
  };
  return (
    <div>
      <CustomerHeader />
      {/* {JSON.stringify(myOrders)} */}
      {myOrders &&
        myOrders.map((item) => (
          <>
            <div
              className="restaurant-wrapper"
              style={{ marginLeft: "auto", marginRight: "auto" }}>
              <h4>Name-{item.data.restaurantName}</h4>
              <div>Amount-{item.amount}</div>
              <div>Address-{item.data.address}</div>
              <div>Status-{item.status}</div>
            </div>
          </>
        ))}
      <CustomerFooter />
    </div>
  );
};

export default page;
