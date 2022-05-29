import React, { useState, useEffect } from "react";
import "./ProfileUpdate.css";

import FaceIcon from "@mui/icons-material/Face";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../redux/actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  // picUplaod
  const picUpload = async (pic) => {
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dkie4szsu");

      await fetch("https://api.cloudinary.com/v1_1/dkie4szsu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const url = data.url.toString();
          setImgURL(url);
          console.log(url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  const updateProfileSubmit = async (e) => {
    e.preventDefault();
    let myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);

    if (imgURL !== "") {
      myForm.set("image", imgURL);
    }
    dispatch(updateProfile(myForm));
    navigate("/");
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    picUpload(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user?.image);
    }

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch(loadUser());
      navigate("/");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, user, isUpdated, navigate]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
