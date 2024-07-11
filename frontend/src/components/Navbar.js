import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const auth = localStorage.getItem("user");
  const vendorRole = auth
    ? JSON.parse(localStorage.getItem("user")).role
    : null;
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          {vendorRole === "vendor" ? (
            <li>
              <Link to="/product/add">Add Product</Link>
            </li>
          ) : (
            <li>
              <Link to="/order/create">Place Order</Link>
            </li>
          )}
            {vendorRole === "vendor" ? (
              <li>
                <Link to="/vendor/order">Orders</Link> 
              </li>):(<li>
                <Link to="/users/order">My Orders</Link>
              </li>
            )}
          <li>
            <Link onClick={logout} to="/login">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
