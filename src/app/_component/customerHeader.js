"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = ({ removedCartData, removeCartData, cartData }) => {
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const cartStorage = JSON.parse(localStorage.getItem("cart"));
  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItem, setCartItem] = useState(cartStorage);
  const [user, setUser] = useState(userStorage ? userStorage : undefined);

  const router = useRouter();
  useEffect(() => {
    if (cartData) {
      if (cartNumber) {
        if (cartItem[0].restro_id !== cartData.restro_id) {
          localStorage.removeItem("cart");
          setCartNumber(1);
          setCartItem([props.cartData]);
          localStorage.setItem("cart", JSON.stringify([cartData]));
        } else {
          let localCartItem = [...cartItem];
          localCartItem.push(JSON.parse(JSON.stringify(cartData)));
          setCartItem(localCartItem);
          setCartNumber(cartNumber + 1);
          localStorage.setItem("cart", JSON.stringify(localCartItem));
        }
      } else {
        setCartNumber(1);
        setCartItem([cartData]);
        localStorage.setItem("cart", JSON.stringify([cartData]));
      }
    }
  }, [cartData]);

  useEffect(() => {
    if (removeCartData) {
      let localCartItem = cartItem.filter((item) => {
        return item._id != removeCartData;
      });
      setCartItem(localCartItem);

      setCartNumber(cartNumber - 1);

      localStorage.setItem("cart", JSON.stringify(localCartItem));
      if (localCartItem.length == 0) {
        localStorage.removeItem("cart");
        window.location.reload();
      }
    }
  }, [removeCartData]);
  useEffect(() => {
    if (removedCartData) {
      setCartItem([]);
      setCartNumber(0);
      localStorage.removeItem("cart");
    }
  }, [removedCartData]);
  const logout = () => {
    localStorage.removeItem("user");
    router.push("/user-auth");
  };
  return (
    <div className="header-wrapper">
      <div className="logo">
        <img
          src="https://th.bing.com/th/id/OIP.rdy7o78lA2VLPZPiltg5hwHaHa?w=157&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          className="logo"
          style={{ width: "5vw", height: "7vh" }}
          alt="Logo"
        />
      </div>
      <ul className="navList">
        <li className="navItem">
          <Link className="navLink" href="/">
            Home
          </Link>
        </li>
        <li className="navItem">
          <Link className="navLink" href="/restaurant">
            Add Restaurant
          </Link>
        </li>
        <li className="navItem">
          <Link className="navLink" href="/dileverypatner">
            Dilivery
          </Link>
        </li>
        {user ? (
          <>
            <li className="navItem">
              <Link className="navLink" href="/myprofile">
                {user?.name}
              </Link>
            </li>
            <li className="navItem">
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="navItem">
              <Link className="navLink" href="/user-auth">
                Login
              </Link>
            </li>
          </>
        )}
        <li className="navItem">
          <Link className="navLink" href={cartNumber ? "/cart" : "#"}>
            Cart({cartNumber ? cartNumber : 0})
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
