"use client";
import CustomerFooter from "@/app/_component/customerFooter";
import CustomerHeader from "@/app/_component/customerHeader";

import { useEffect, useState } from "react";

const Page = (props) => {
  const [restaurantDetail, setRestaurantDetail] = useState();
  const [foodItem, setFoodItem] = useState([]);
  const [cartData, setCartData] = useState();
  const [cartStorage, setCartStorage] = useState(
    localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart"))
  );
  const [cartIds, setCartIds] = useState(() =>
    cartStorage
      ? cartStorage.map((item) => {
          return item._id;
        })
      : []
  );
  const [removeCartData, setRemoveCartData] = useState();
  const restaurantname = props.params.name;

  const loadRestaurantDetail = async () => {
    const id = props.searchParams.id;
    let response = await fetch(`http://localhost:3000/api/customer/${id}`);
    response = await response.json();
    if (response.success) {
      setRestaurantDetail(response.detail);
      setFoodItem(response.foodItem);
    }
  };

  useEffect(() => {
    loadRestaurantDetail();
  }, []);

  const addToCart = (item) => {
    setCartData(item);
    window.location.reload();
    let localCartIds = cartIds;
    localCartIds.push(item.id);
    setCartIds(localCartIds);
    setCartData(item);
    setRemoveCartData();
  };

  const removeFromCart = (id) => {
    setRemoveCartData(id);
    var localIds = cartIds.filter((item) => item != id);
    setCartData();
    setCartIds(localIds);
  };

  return (
    <>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="restaurant-page-banner">
        <h1>{decodeURI(restaurantname)}</h1>
      </div>
      <div className="detail-wrapper">
        <h2>Contact-{restaurantDetail?.contact}</h2>
        <h2>City-{restaurantDetail?.city}</h2>
        <h2>Address-{restaurantDetail?.address}</h2>
        <h2>Email-{restaurantDetail?.email}</h2>
      </div>
      <div className="food-item-wrapper">
        {foodItem.length > 0 ? (
          foodItem.map((item) => (
            <div key={item.id} className="list-item">
              <div>
                <img
                  src={item.img_path}
                  alt={item.name}
                  style={{ width: 100 }}
                />
              </div>
              <div>
                <div>{item.name}</div>
                <div className="description">{item.description}</div>
                <div>{item.price}</div>
                {cartIds.includes(item._id) ? (
                  <button onClick={() => removeFromCart(item._id)}>
                    REMOVE FROM CART
                  </button>
                ) : (
                  <button onClick={() => addToCart(item)}>ADD TO CART</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>No Added any food item By Particular Restaurant</h1>
        )}
      </div>
      <CustomerFooter />
    </>
  );
};

export default Page;
