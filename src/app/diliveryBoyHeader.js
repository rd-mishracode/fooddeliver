import Link from "next/link";

const DiliveryBoyHeader = () => {
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
      </ul>
    </div>
  );
};

export default DiliveryBoyHeader;
