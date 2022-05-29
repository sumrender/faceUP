import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../redux/actions/userAction";
import Loading from "../loading/Loading";
import noImage from "../../media/noImg.jpeg";
import "../auth/Authstyle.css"; //css

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

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

  const registerSubmit = async (e) => {
    e.preventDefault();
    console.log("submission started register");
    try {
      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      if (imgURL !== "") {
        myForm.set("image", imgURL);
      }

      dispatch(register(myForm));
      console.log("register function dispatched with img url");
      navigate("/");
    } catch (error) {
      console.log("Register Error:", error.message);
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      picUpload(e.target.files[0]);
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert("Registration Error: ", error.message);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="body">
            <div className="pt-6">
              <form
                className=" flex w-[70vw] m-auto"
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="form text-input-fields m-auto">
                  <div className="signUpName flex space-x-2">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="login-form flex space-x-2">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="login-form flex space-x-2">
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="login-form flex space-x-2">
                    <HowToRegIcon />
                    <button type="submit">Register</button>
                  </div>
                </div>
                <div className="form registerImage w-[30vw] m-auto">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" />
                  ) : (
                    <img src={noImage} className="" alt="Avatar Preview" />
                  )}

                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
