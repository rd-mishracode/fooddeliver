"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserRegister = ({ redirect }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const router = useRouter();

  const handleRegister = async (props) => {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !city ||
      !address ||
      !contact
    ) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    let response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, city, address, contact }),
    });
    response = await response.json();
    console.log(response);
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      if (redirect?.order) {
        router.push("/order");
      } else {
        router.push("/");
      }
    }
    if (response.success === false) {
      alert(response.message);
    }
  };

  return (
    <div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter Name"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter Email"
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
          type="password"
          placeholder="Enter Confirm Password"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          placeholder="Enter Address"
          className="input-field"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="tel"
          placeholder="Enter Phone"
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
  );
};

export default UserRegister;
