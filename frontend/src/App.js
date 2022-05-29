import "./App.css";
// react
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// redux
import store from "./redux/store";
import { loadUser } from "./redux/actions/userAction";

// stripe
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// components
import Home from "./component/Home.jsx";
import Loading from "./component/loading/Loading";
import ProtectedRoute from "./routes/ProtectedRoute";
import Payment from "./component/Payment";
// layout
import NavBar from "./component/layout/NavBar";
import Footer from "./component/layout/Footer";
// products
import Products from "./component/products/Products.jsx";
import ProductDetails from "./component/products/ProductDetails";
import Cart from "./component/cart/Cart";
import Shipping from "./component/shipping/Shipping";
// orders
import OrderSuccess from "./component/order/OrderSuccess";
import Orders from "./component/order/Orders";
import ConfirmOrder from "./component/order/ConfirmOrder";
import OrderDetails from "./component/order/OrderDetails";
// user
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Profile from "./component/user/Profile";
import ProfileUpdate from "./component/user/ProfileUpdate";
import ForgotPassword from "./component/password/ForgotPassword";
import UpdatePassword from "./component/password/UpdatePassword";
import ResetPassword from "./component/password/ResetPassword";
import ProductsSearch from "./component/SEARCH/ProductsSearch";
import GetFaces from "./component/face/GetFaces";
import CarouselSelf from "./component/carousel/CarouselSelf";
// import Glasses from "./component/Glasses";

function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    setStripeApiKey(process.env.REACT_APP_STRIPE_API_KEY);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Loading />
        ) : (
          <>
            <NavBar user={user} isAuthenticated={isAuthenticated} />
            <Routes>
              <Route exact path="/glasses"></Route>
              <Route exact path="/test" element={<CarouselSelf/>}></Route>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/products" element={<Products />} />
              <Route exact path="/search" element={<ProductsSearch />} />
              <Route exact path="/product/:id" element={<ProductDetails />} />

              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/face" element={<GetFaces />} />

              <Route
                exact
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/profile/update"
                element={
                  <ProtectedRoute>
                    <ProfileUpdate />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/password/update"
                element={
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/password/forgot"
                element={<ForgotPassword />}
              />
              <Route
                exact
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route
                exact
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/success"
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/confirm-orders"
                element={
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              />
            </Routes>
            {stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Routes>
                  <Route
                    exact
                    path="/process/payment"
                    element={
                      <ProtectedRoute>
                        <Payment />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Elements>
            )}
          </>
        )}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
