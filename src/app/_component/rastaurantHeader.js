"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const RestaurantHeader = () => {
  const [detail, setDetail] = useState();

  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    let data = localStorage.getItem("restaurantUser");
    if (!data && pathName == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName == "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      setDetail(JSON.parse(data));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("restaurantUser");

    router.push("/restaurant");
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
        {!detail ? (
          <>
            <li className="navItem">
              <Link className="navLink" href="/Signup">
                Signup
              </Link>
            </li>
            <li className="navItem">
              <Link className="navLink" href="login">
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="navItem">
              <button onClick={handleLogout}>Logout</button>
              <Link className="navLink" href="/profile">
                Profile
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default RestaurantHeader;
