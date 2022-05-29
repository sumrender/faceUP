import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItemsToCart } from "../../redux/actions/cartAction";
import {
  clearErrors,
  getProductDetails,
  // newReview,
} from "../../redux/actions/productAction";
import { NEW_REVIEW_RESET } from "../../redux/constants/productConstants";
import Loading from "../loading/Loading";
// import Review from "./misc/Review";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  // const [open, setOpen] = useState(false);
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
  };

  // const submitReviewToggle = () => {
  //   open ? setOpen(false) : setOpen(true);
  // };

  // const reviewSubmitHandler = () => {
  //   const myForm = new FormData();

  //   myForm.set("rating", rating);
  //   myForm.set("comment", comment);
  //   myForm.set("productId", id);

  //   dispatch(newReview(myForm));

  //   setOpen(false);
  // };

  useEffect(() => {
    if (error) {
      alert("Fetch prodcts data error:", error.message);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert("review error:", error.message);
      dispatch(clearErrors());
    }

    if (success) {
      dispatch({ type: NEW_REVIEW_RESET });
    }
    console.log("dispatch front 1");
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="product-details-page">
            <div className="flex gap-2 justify-between">
              <div className="product-details-image-div" >
                <img
                  src={product.images && product.images[0]}
                  alt="Product"
                  className="product-details-image"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="product-heading">
                  <h1 className="product-name">{product.name}</h1>
                  {/* <p className="product-id"># {product._id}</p> */}
                </div>
                <div className="product-purchase-div">
                  <p className="product-price">
                    <s>₹{product.price}</s> ₹{Math.round(product.price - 0.4 * product.price, 3)}
                  </p>
                </div>
                <div className="product-quantity">
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                  </div>
                  <div className="product-quantity-1">
                    <p>{quantity}</p>
                  </div>
                  <div>
                    <button
                      className="btn btn-success"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="product-stock-status">
                  <p>
                    Status:
                    <b
                      className={product.Stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>
                <div className="product-desc">{product.description}</div>
                <hr />
                <div className="product-cart">
                  <button
                    className="btn btn-success"
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <Review /> */}
        </>
      )}
    </>
  );
};

export default ProductDetails;
