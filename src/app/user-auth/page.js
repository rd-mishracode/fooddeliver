"use client";
import React, { useState } from "react";
import CustomerHeader from "../_component/customerHeader";
import CustomerFooter from "../_component/customerFooter";
import UserRegister from "../_component/UserRegister";
import UserLogin from "../_component/UserLogin";

const UserAuth = (props) => {
  const [login, setLogin] = useState(true);
  return (
    <div>
      <CustomerHeader />
      <div className="container">
        <h1>{login ? "User Login" : "User Signup"}</h1>
        {login ? (
          <UserLogin redirect={props.searchParams} />
        ) : (
          <UserRegister redirect={props.searchParams} />
        )}
        <button className="button-link" onClick={() => setLogin(!login)}>
          {login
            ? "Do not have't account?Signup"
            : " Already have Account ?login "}
        </button>
      </div>

      <CustomerFooter />
    </div>
  );
};

export default UserAuth;
