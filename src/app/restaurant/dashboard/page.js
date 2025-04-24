"use client";
import RastaurantHeader from "@/app/_component/rastaurantHeader";
import RestaurantFooter from "@/app/_component/restaurantFooter";
import React, { useState } from "react";
import "../style.css";
import AddFoodItem from "@/app/_component/addFoodItem";
import FoodItemList from "@/app/_component/foodItemList";

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);
  return (
    <>
      <RastaurantHeader />
      <button onClick={() => setAddItem(true)}>Add Food Item</button>
      <button onClick={() => setAddItem(false)}>Dashboard</button>
      {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
      <RestaurantFooter />
    </>
  );
};

export default Dashboard;
