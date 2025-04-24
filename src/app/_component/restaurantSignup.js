"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const validatePassword = (password) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(password);
  };

  const handleRegister = async () => {
    if (!validatePassword(password)) {
      setError("ex:Jhon@123 other wise not accept");
      return;
    }

    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        address,
        city,
        restaurantName,
        contact,
      }),
    });

    response = await response.json();

    if (response.success === false) {
      return alert(response.message);
    }
    if (response.success) {
      alert("Registered Successfully");
      const { result } = response;
      delete result.password && delete result.confirmpassword;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    }
  };

  return (
    <>
      <h3 className="formh3">Signup Component</h3>
      <div className="form-inputbox">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Email Id"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Enter Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Restaurant Name"
            className="input-field"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter City"
            className="input-field"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Address Detail"
            className="input-field"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Contact No. Detail"
            className="input-field"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <button className="input-field" onClick={handleRegister}>
            Signup
          </button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSignup;
