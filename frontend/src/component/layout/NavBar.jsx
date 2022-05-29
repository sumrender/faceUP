import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NavBar.css";

import { Avatar } from "@mui/material";

// icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

export default function NavBar({ user, isAuthenticated }) {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="navbar-main" id="navbar">
      <div className="navbar-title">
        <Link to="/">
          <p>faceUP!</p>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/products">
          <span>
            <ShoppingBasketIcon /> Products
          </span>
        </Link>
        <Link to="/face">
          <span>
            <FaceRetouchingNaturalIcon /> Face
          </span>
        </Link>
        <a href={process.env.PUBLIC_URL + "glasses.html"}>
          <span>
            <VisibilityIcon /> Glasses
          </span>
        </a>
        <Link to="/search">
          <span>
            <SearchIcon /> Search
          </span>
        </Link>
        <Link to="/cart">
          <span>
            <ShoppingCartIcon /> Cart({cartItems.length})
          </span>
        </Link>
        {isAuthenticated ? (
          <>
            <Link sx={{ marginTop: -1, marginBottom: -1 }} to="/profile">
              <Avatar alt="User Pic" src={user?.image} />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}
