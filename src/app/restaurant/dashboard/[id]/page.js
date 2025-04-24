"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditFoodItem = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [path, setPath] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleEditFoodItem = async () => {
    if (!name || !price || !description || !path) {
      return setError(true);
    } else {
      setError(false);
    }

    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name,
          price,
          description,
          img_path: path,
        }),
      }
    );

    response = await response.json();
    console.log(response);
    if (response.success) {
      alert("Food has Updated Successfully");
      router.push("../dashboard");
    } else {
      alert("Food Item Not Updated Successfully");
    }
  };
  const handleLoadFoodItem = async () => {
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`,
      {
        method: "GET",
      }
    );

    response = await response.json();

    if (response.success) {
      setName(response.result.name);
      setPrice(response.result.price);
      setDescription(response.result.description);
      setPath(response.result.img_path);
    } else {
      alert("Food Item Not Updated Successfully");
    }
  };

  useEffect(() => {
    handleLoadFoodItem();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Edit Food Item</h1>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Food Name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && (
            <span className="input-error">This Field Cannot Be Empty</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Price"
            className="input-field"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {error && !price && (
            <span className="input-error">This Field Cannot Be Empty</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Description Of Food"
            className="input-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && !description && (
            <span className="input-error">This Field Cannot Be Empty</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Image Path"
            className="input-field"
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
          {error && !path && (
            <span className="input-error">This Field Cannot Be Empty</span>
          )}
        </div>

        <div className="input-wrapper">
          <button className="input-field" onClick={handleEditFoodItem}>
            Update Food Item
          </button>
        </div>
        <div className="input-wrapper">
          <button
            className="input-field"
            onClick={() => router.push(`../dashboard`)}>
            Back To Food Item List
          </button>
        </div>
      </div>
    </>
  );
};

export default EditFoodItem;
