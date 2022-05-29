import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import Loading from "../loading/Loading";
import { logout } from "../../redux/actions/userAction";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      <Navigate to="/login" />;
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    <Navigate to="/" />;
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="profile-page">
          <div className="profile-card">
            <div className="profile-image-div">
              <img
                src={user?.image}
                alt={user?.name}
                className="profile-image"
              />
            </div>
            <div className="profile-details-div">
              <div className="profile-details-header">
                <h1 className="profile-user-name">{user?.name}</h1>
                <p className="profile-user-email">{user.email}</p>
                <p className="profile-user-date-joined">
                  Date Joined : {String(user.createdAt).substr(0, 10)}
                </p>
              </div>
              <div className="button-group">
                <Link to="/orders">
                  <button className="button button-primary">My Orders</button>
                </Link>
                <Link to="/profile/update">
                  <button className="button button-success">
                    Edit Profile
                  </button>
                </Link>
                <Link to="/password/update">
                  <button className="button button-success">
                    Change Password
                  </button>
                </Link>
                <button className="button button-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
