"use client";
import { useState, useEffect } from "react";
import CustomerHeader from "../_component/customerHeader";
import { DILIVERY_CHARGES, TAX } from "../lib/constant";
import CustomerFooter from "../_component/customerFooter";
import { useRouter } from "next/navigation";

const Page = () => {
  const [userStorage, setUserStorage] = useState({});
  const [cartStorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState(0);
  const [removedCartData, setRemovedCartData] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    setUserStorage(user);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartStorage(cart);

    const calculatedTotal = cart.reduce(
      (acc, item) => acc + parseFloat(item.price),
      0
    );
    setTotal(calculatedTotal);
  }, []);

  const placeOrder = async () => {
    let user_id = JSON.parse(localStorage.getItem("user"))._id;
    let city = JSON.parse(localStorage.getItem("user")).city;
    let cart = JSON.parse(localStorage.getItem("cart"));
    let foodItemIds = cart.map((item) => item._id).toString();
    let diliveryBoyResponse = await fetch(
      `http://localhost:3000/api/diliveryPatners/${city}`
    );
    diliveryBoyResponse = await diliveryBoyResponse.json();
    let diliveryBoyResponseIds = diliveryBoyResponse?.result?.map((item) => {
      return item._id;
    });
    // return false;
    // after return flase next line execution will be stop
    // let diliveryBoy_id = "660c42156c1b5373566d55bc";
    let diliveryBoy_id =
      diliveryBoyResponseIds[
        Math.floor(Math.random() * diliveryBoyResponseIds.length)
      ];

    // console.log(diliveryBoy_id);
    if (!diliveryBoy_id) {
      alert("Dilivery Boy Not avaliable for that location");
    }
    // return false;
    let restro_id = cart[0].restro_id;

    const collection = {
      user_id,
      restro_id,
      foodItemIds,
      diliveryBoy_id,
      status: "confirm",
      amount: total + DILIVERY_CHARGES + (total * TAX) / 100,
    };

    let response = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      body: JSON.stringify(collection),
    });

    response = await response.json();
    if (response.success) {
      alert("order Confirm");
      setRemovedCartData(true);
      router.push("/myprofile");
    } else {
      alert("order Failed");
    }
  };

  return (
    <>
      <CustomerHeader removedCartData={removedCartData} />
      <div style={{ marginTop: "4%" }}>
        <div className="total-wrapper">
          <div className="block-1">
            <h2>User Details</h2>
            <div className="row">
              <span>Name-</span>
              <span>{userStorage?.name}</span>
            </div>
            <div className="row">
              <span>Address-</span>
              <span>{userStorage?.address}</span>
            </div>
            <div className="row">
              <span>Mobile No.-</span>
              <span>{userStorage?.contact}</span>
            </div>
            <h2>Amount Details</h2>
            <div className="row">
              <span>Food Item Price-</span>
              <span>{total.toFixed(2)}</span>
            </div>
            <div className="row">
              <span>GST(%)-</span>
              <span>{((total * TAX) / 100).toFixed(2)}</span>
            </div>
            <div className="row">
              <span>Delivery Charges-</span>
              <span>{DILIVERY_CHARGES.toFixed(2)}</span>
            </div>
            <div className="row">
              <span>Total Amount-$</span>
              <span>
                {(total + DILIVERY_CHARGES + (total * TAX) / 100).toFixed(2)}
              </span>
            </div>
            <h2>Payment Method</h2>
            <div className="row">
              <span>Cash On Delivery</span>
              <span>
                {(total + DILIVERY_CHARGES + (total * TAX) / 100).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="block-2">
            <button onClick={placeOrder}>Place Order Now</button>
          </div>
        </div>
      </div>
      <CustomerFooter />
    </>
  );
};

export default Page;
