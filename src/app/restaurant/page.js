"use client";
import { useState } from "react";
import RestaurantLogin from "../_component/restaurantLogin";
import RestaurantSignup from "../_component/restaurantSignup";
import RastaurantHeader from "../_component/rastaurantHeader";
import "./style.css";
import RestaurantFooter from "../_component/restaurantFooter";
const Restaurant = () => {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(true);
  return (
    <div className="container">
      <RastaurantHeader />
      {login ? <RestaurantLogin /> : <RestaurantSignup />}
      <button onClick={() => setLogin(!login)} className="button-link">
        {login
          ? "Do Not have a Account?Signup"
          : "Already have a Account?Login"}
      </button>
      <RestaurantFooter />
    </div>
  );
};

export default Restaurant;
