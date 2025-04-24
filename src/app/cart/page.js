"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_component/customerHeader";
import RestaurantFooter from "../_component/restaurantFooter";
import { DILIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
  const [cartStorage, setCartStorage] = useState([]);

  useEffect(() => {
    const storedCartItem = JSON.parse(localStorage.getItem("cart")) || [];
    setCartStorage(storedCartItem);
  }, []);

  const calculateTotal = (cartItems) => {
    if (cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  };
  const total = calculateTotal(cartStorage);
  const router = useRouter();
  const orderNow = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      router.push("/user-auth?order=true");
    }
  };
  const removeFromCart = (id) => {
    const updateRemoveCartFromItem = cartStorage.filter(
      (item) => item._id !== id
    );
    setCartStorage(updateRemoveCartFromItem);
    localStorage.setItem("cart", JSON.stringify(updateRemoveCartFromItem));
  };
  return (
    <>
      <CustomerHeader />

      <div className="food-item-wrapper">
        {cartStorage.length > 0 ? (
          cartStorage.map((item) => (
            <div key={item.id} className="list-item">
              <div className="list-item-block-1">
                <img
                  src={item.img_path}
                  alt={item.name}
                  style={{ width: 100 }}
                />
              </div>

              <div className="list-item-block-2">
                <div>{item.name}</div>
                <div className="description">{item.description}</div>
                {
                  <button onClick={() => removeFromCart(item._id)}>
                    REMOVE FROM CART
                  </button>
                }
              </div>

              <div className="list-item-block-3">Price:{item.price} $</div>
            </div>
          ))
        ) : (
          <h1>No Added any food item By Particular Restaurant</h1>
        )}
      </div>
      <div>
        <div className="total-wrapper">
          <div className="block-1">
            <div className="row">
              <span>Food Item Price-</span>
              <span>{total}</span>
            </div>
            <div className="row">
              <span>GST(%)-</span>
              <span>{(total * TAX) / 100}</span>
            </div>
            <div className="row">
              <span>Dilivery Charges-</span>
              <span>{DILIVERY_CHARGES}</span>
            </div>
            <div className="row">
              <span>Total Amount-$</span>
              <span>{total + DILIVERY_CHARGES + (total * TAX) / 100}</span>
            </div>
          </div>
          <div className="block-2">
            <button onClick={orderNow}>Order Now</button>
          </div>
        </div>
      </div>

      <RestaurantFooter />
    </>
  );
};

export default Page;
