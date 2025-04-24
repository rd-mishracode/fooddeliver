"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ status: false, message: "" });
  const router = useRouter();
  const handleLogin = async () => {
    console.log("login", email, password, confirmPassword);

    if (!email || !password) {
      setError({ status: true, message: "Email and Password are required" });
      return false;
    }

    if (password !== confirmPassword) {
      setError({
        status: true,
        message: "Password and Confirm Password do not match",
      });
      return false;
    }

    setError({ status: false, message: "" });

    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",

      body: JSON.stringify({
        email,
        password,
        login: true,
      }),
    });

    response = await response.json();

    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
      alert("Login Successfully");
    } else {
      setError({ status: true, message: response.message });
    }
  };

  return (
    <>
      <h3 className="formh3">Login Component</h3>
      <div className="form-inputbox">
        {error.status && !email && (
          <span className="input-error">Email is Required</span>
        )}
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Email Id"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error.status && !password && (
          <span className="input-error">Password is Required</span>
        )}
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Enter Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error.status && password !== confirmPassword && (
          <span className="input-error">
            Confirm Password & Confirm Pass Required
          </span>
        )}
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
          <button className="input-field" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default RestaurantLogin;
