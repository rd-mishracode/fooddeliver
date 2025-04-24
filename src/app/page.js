"use client";
import CustomerHeader from "./_component/customerHeader";
import CustomerFooter from "./_component/customerFooter";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState("");
  const [restaurant, setRestaurant] = useState([]);

  const router = useRouter();
  const loadLocation = async () => {
    let response = await fetch(`http://localhost:3000/api/customer/location`);
    response = await response.json();
    console.log(response.result);
    if (response.success) {
      setLocation(response.result);
    }
  };
  useEffect(() => {
    loadLocation();
    loadRestaurants();
  }, []);
  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({ location: item });
  };

  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
    }
    let response = await fetch(url);
    response = await response.json();

    if (response.success) {
      setRestaurant(response.result);
    }
  };
  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Welcome To Food Dilivery</h1>
        <div className="customer-input-wrapper">
          <input
            type="text"
            className="select-input"
            value={selectedLocation}
            placeholder="Select Place"
            onClick={() => setShowLocation(true)}
          />
          <ul className="location-list">
            {showLocation &&
              location.map((item) => (
                <li key={item?.location} onClick={() => handleListItem(item)}>
                  {item}
                </li>
              ))}
          </ul>
          <input
            type="text"
            className="search-input"
            onChange={(e) => loadRestaurants({ restaurant: e.target.value })}
            placeholder="Enter Food Or Restaurant"
          />
        </div>
      </div>

      <div className="restaurant-list-container">
        {restaurant?.map((item) => (
          <div
            className="restaurant-wrapper"
            key={item._id}
            onClick={() =>
              router.push(
                `restaurantExplore/${item?.restaurantName}?id=${item._id}`
              )
            }>
            <div className="heading-wrapper">
              <h3>{item.restaurantName}</h3>
              <h5>Mobile No.{item.contact}</h5>
            </div>
            <div className="address-wrapper">
              <div>{item.city},</div>
              <div>{item.address},</div>

              <div>{item.email}</div>
            </div>
          </div>
        ))}
      </div>
      <CustomerFooter />
    </main>
  );
}
