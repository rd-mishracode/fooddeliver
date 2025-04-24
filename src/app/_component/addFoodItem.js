import React, { useState } from "react";

const AddFoodItem = ({ setAddItem }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [path, setPath] = useState("");
  const [error, setError] = useState(false);

  const handleToAddFoodItem = async () => {
    if (!name || !price || !description || !path) {
      return setError(true);
    } else {
      setError(false);
    }

    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    const restro_id = restaurantData._id;

    let response = await fetch("http://localhost:3000/api/restaurant/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        description,
        img_path: path,
        restro_id,
      }),
    });

    response = await response.json();

    if (response.success) {
      alert("Food Added Successfully");
      setAddItem(false);
    } else {
      alert("Food Item Not Added Successfully");
    }
  };

  return (
    <div className="container">
      <h1>Add New Food Item</h1>

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
        <button className="input-field" onClick={handleToAddFoodItem}>
          Add Food Item
        </button>
      </div>
    </div>
  );
};

export default AddFoodItem;
