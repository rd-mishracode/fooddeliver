"use client";
import React, { useEffect, useState } from "react";
import CustomerFooter from "../_component/customerFooter";
import { useRouter } from "next/navigation";
import DiliveryBoyHeader from "../diliveryBoyHeader";

const page = () => {
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();

  useEffect(() => {
    const dilivery = JSON.parse(localStorage.getItem("dilivery"));
    if (dilivery) {
      router.push("/diliveryBoyDashboard");
    }
  }, []);
  const handleSignup = async () => {
    let response = await fetch(
      "http://localhost:3000/api/diliveryPatners/Signup",
      {
        method: "POST",
        body: JSON.stringify({ name, password, city, address, mobile }),
      }
    );
    response = await response.json();
    console.log(response);
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("dilivery", JSON.stringify(result));
      alert("success");
      router.push("/diliveryBoyDashboard");
    } else {
      alert(failed);
    }
  };
  const handleLogin = async () => {
    console.log("login Button Work");
    let response = await fetch("http://localhost:3000/api/diliveryPatners", {
      method: "POST",
      body: JSON.stringify({ mobile: loginMobile, password: loginPassword }),
    });
    response = await response.json();
    console.log(response);
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("dilivery", JSON.stringify(result));
      alert("success");
      router.push("/diliveryBoyDashboard");
    } else {
      alert("failed");
    }
  };
  return (
    <div>
      <DiliveryBoyHeader />
      <>
        <h1 style={{ textAlign: "center" }}> Dilivery Patner</h1>
        <div className="auth-container">
          <div className="login-wrapper">
            <h2>Login</h2>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter Mobile No."
                className="input-field"
                value={loginMobile}
                onChange={(e) => setLoginMobile(e.target.value)}
              />
            </div>

            <div className="input-wrapper">
              <input
                type="password"
                placeholder="Enter Password"
                className="input-field"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <button className="input-field" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
          <div className="signup-wrapper">
            {" "}
            <h2>Signup</h2>
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
                type="tel"
                placeholder="Enter Phone"
                className="input-field"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
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
              <button className="input-field" onClick={handleSignup}>
                Signup
              </button>
            </div>
          </div>
        </div>
      </>
      <CustomerFooter />
    </div>
  );
};

export default page;
