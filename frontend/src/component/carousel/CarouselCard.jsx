import {  Rating
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./CarouselCard.css";


const CarouselCard = ({ product }) => {
  let desc = product.description;
  if (desc.length > 40) {
    desc = desc.substring(0, 40);
  }
  return (
    <>
      <Link to={`/product/${product._id}`}>
        <div className="product-carousel">
          <div className="product-carousel-image">
            <img src={product.images[0]} alt="product" />
          </div>
          <div className="product-carousel-details">
            <p className="item-name">{product.name}</p>

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

export default CarouselCard;
