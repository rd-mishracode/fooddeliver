import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState();
  const router = useRouter();
  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    try {
      const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
      const restro_id = restaurantData._id;
      const response = await fetch(
        `http://localhost:3000/api/restaurant/foods/${restro_id}`
      );
      const data = await response.json();
      if (data.success) {
        setFoodItems(data.result);
      } else {
        alert("This food item is not in the list");
      }
    } catch (error) {
      console.error("Error loading food items:", error);
    }
  };
  const deleteFoodItems = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurant/foods/${id}`,
        { method: "delete" }
      );
      const data = await response.json();
      if (data.success) {
        loadFoodItems();
      } else {
        alert("Item Not Deleted For Some Error");
      }
    } catch (error) {
      console.error("Error loading food items:", error);
    }
  };
  const updateFoodItems = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurant/foods/${id}`,
        { method: "put" }
      );
      const data = await response.json();
      if (data.success) {
        loadFoodItems();
      } else {
        alert("Item Not Updated Due to Some Error");
      }
    } catch (error) {
      console.error("Error loading food items:", error);
    }
  };
  return (
    <div className="all-table">
      <h1>Food Items</h1>
      <table>
        <thead>
          <tr>
            <td>S.N.</td>
            <td>Name</td>
            <td>Price</td>
            <td>Image</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {/* {JSON.stringify(foodItems, null, 4)} */}
          {foodItems?.map((item, key) => (
            <tr>
              <td key={key}>{key}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <img src={item.img_path} alt={item.name} />
              </td>
              <td>
                <button
                  onClick={() => deleteFoodItems(item._id)}
                  style={{
                    backgroundColor: "red",
                    color: "#fff",
                    border: "none",
                    padding: "15px",
                  }}>
                  <DeleteIcon
                    style={{
                      color: "#fff",
                      marginRight: "2px",
                    }}
                  />
                  Delete
                </button>
                <button
                  onClick={() => router.push(`dashboard/${item._id}`)}
                  style={{
                    backgroundColor: "blue",
                    color: "#fff",
                    border: "none",
                    padding: "15px",
                  }}>
                  <EditIcon
                    style={{
                      color: "#fff",
                      marginRight: "2px",
                    }}
                  />
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemList;
