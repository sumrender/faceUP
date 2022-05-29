import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { clearErrors, login } from "../../redux/actions/userAction";
import Loading from "../loading/Loading";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/LockOpen";
import "../auth/Authstyle.css";

const Login = () => {
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      <Navigate to="/" />;
    }
  }, [dispatch, error, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isAuthenticated === true ? (
            <Navigate to={"/"} />
          ) : (
            <div className="body">
              <div class="form">
                <form class="login-form">
                  <LockIcon />
                  <p>Login</p>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <div className="mb-2 hover:text-blue-400">
                    <Link to="/password/forgot">Forgot Password ?</Link>
                  </div>

                  <button type="submit" onClick={loginSubmit}>
                    login
                  </button>
                  <div className="mt-2 hover:text-blue-400">
                    <Link to="/register">Create Account</Link>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Login;
