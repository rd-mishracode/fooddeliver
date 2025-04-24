"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserLogin = ({ redirect }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleLogin = async (props) => {
    let response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      if (redirect?.order) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      alert("failed to Login");
    }
  };
  return (
    <div>
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
        <button className="input-field" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
