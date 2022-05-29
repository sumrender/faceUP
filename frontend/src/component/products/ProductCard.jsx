import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const style = {
  width: "180px",
  margin: 3,
  borderColor: "black",
  borderBottom: "1px solid",
};

const ProductCard = ({ product }) => {
  let desc = product.description;
  if (desc.length > 40) {
    desc = desc.substring(0, 40);
  }
  return (
    <>
      <Link to={`/product/${product._id}`}>
        <div className="product">
          <img src={product.images[0]} alt="product" />

          <hr />
          <div className="product-details">
            <p className="item-name">{product.name}</p>
            <p className="item-details">
              {desc}
              {"..."}
            </p>
            <p className="item-price">₹ {product.price}</p>
            <div>
              <Rating value={product.ratings} readOnly />{" "}
              <span className="productCardSpan">
                {" "}
                ({product.numOfReviews} Reviews)
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
