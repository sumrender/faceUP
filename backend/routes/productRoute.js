import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  createProducts,
} from "../controller/productController.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/authorization.js";

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts);

productRouter
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllProducts);

productRouter
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

productRouter
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProducts);

productRouter
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

productRouter.route("/product/:id").get(getProductDetails);

productRouter.route("/review").put(isAuthenticatedUser, createProductReview);

productRouter
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

export default productRouter;
