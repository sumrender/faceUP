import React, { useEffect, useState } from "react";
import WebcamUpload from "./WebcamUpload";
import ImageUpload from "./ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { detectFace } from "../../redux/actions/faceAction";
import Loading from "../loading/Loading";
import CarouselSelf from "../carousel/CarouselSelf"
import "./GetFaces.css"
import { Card } from "@mui/material";


const ShowProducts = ({ filter, gender, title }) => {
  console.log(title)
  return (
    <div className="recommendation-section">
      <h1 className="section-header">{title}</h1>
      <CarouselSelf filter={filter} gender={gender} />
    </div>
  )
}


const GetFaces = () => {
  const dispatch = useDispatch();

  const [isRequestSent, setIsRequestSent] = useState(false)
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [webcam, setWebcam] = useState(false);

  const { loading, faces } = useSelector((state) => state.faces);

  useEffect(() => {
    if (image === "") {
      return;
    }
    dispatch(detectFace(image));
    setIsRequestSent(true)
    console.log(isRequestSent)
  }, [image, dispatch]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="top-container h-[40vh]">
            <div>
              <Card className="handleImages  bg-blue-200">
                <div className="fileInput">
                  <ImageUpload setImage={setImage} setImageURL={setImageURL} setWebcam={setWebcam} />

                  <div className="webcamInput">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-3"
                      onClick={() => setWebcam((prev) => !prev)}
                    >
                      Turn Webcam On/Off
                    </button>
                  </div>
                </div>
              </Card>
            </div>


            <div>
              <Card className="imgDisplay bg-orange-500 grid place-items-center">
                {webcam && (
                  <WebcamUpload
                    setImage={setImage}
                    setImageURL={setImageURL}
                    setWebcam={setWebcam}
                  />
                )}
                {(imageURL && !webcam) && (
                  <img
                    src={imageURL}
                    className="w-52 h-52 rounded-full"
                    alt="user"
                  />
                )}
              </Card>
            </div>
            {isRequestSent && (faces.length > 0 ? (<div>
              <Card className="showFaceData ">
                <div style={{
                  "text-align": "center",
                  "font-size": "1.2rem",
                  "font-weight": "600"
                }}>Face Details</div>
                <div>
                  <div className="faceDataAttribute">
                    <span>Gender: </span>
                    <span>{faces[0].faceAttributes.gender}</span>
                  </div>
                  <div className="faceDataAttribute">
                    <span>Age: </span>
                    <span>{faces[0].faceAttributes.age}</span>
                  </div>
                  <div className="faceDataAttribute">
                    <span>Hair Color: </span>
                    <span>{faces[0].faceAttributes.hair.hairColor[0].color}</span>
                  </div>
                  <div className="faceDataAttribute">
                    <span>Beard: </span>
                    <span>{faces[0].faceAttributes.facialHair.beard >= 0.5 ? "true" : "false"}</span>
                  </div>
                  <div className="faceDataAttribute">
                    <span>Moustache: </span>
                    <span>{faces[0].faceAttributes.facialHair.moustache >= 0.5 ? "true" : "false"}</span>
                  </div>
                  <div className="faceDataAttribute">
                    <span>Eye Makeup: </span>
                    <span>{faces[0].faceAttributes.makeup.eyeMakeup ? "true" : "false"}</span>
                  </div>
                  <div className="faceDataAttribute">
                    <span>Lip Makeup: </span>
                    <span>{faces[0].faceAttributes.makeup.lipMakeup ? "true" : "false"}</span>
                  </div>
                </div>
              </Card>
            </div>
            ) : <div>No face found</div>)}
          </div>
          {/* {console.log(faces)} */}

          <div className="recommendations">
            <div className="handlefilters">
              {faces[0]?.faceAttributes.gender === "male" && (
                <>
                  {faces[0].faceAttributes.facialHair.moustache >= 0.5 && (
                    <ShowProducts filter="moustache" gender="male" title="Moustache" />
                  )}
                  {faces[0].faceAttributes.facialHair.beard >= 0.5 && (
                    <ShowProducts filter="beard" gender="male" title="Beard" />
                  )}
                  {faces[0].faceAttributes.age >= 40 && (
                    <ShowProducts filter="ancient" gender="male" title="Popular among your age range" />
                  )}
                  {faces[0].faceAttributes.age < 40 && (
                    <ShowProducts filter="old" gender="male" title="Popular among your age range" />
                  )}
                  {faces[0].faceAttributes.hair.baldness >= 0.5 && (
                    <ShowProducts filter="bald" gender="male" title="Haircare" />
                  )}
                  {faces[0].faceAttributes.accessories.length >= 0 && (
                    <ShowProducts filter="glass" gender="male" title="Glasses" />
                  )}
                </>
              )}
            </div>
            <div className="handlefilters">
              {faces[0]?.faceAttributes.gender === "female" && (
                <>
                  {faces[0].faceAttributes.age >= 30 && (
                    <ShowProducts filter="old" gender="female" title="Popular among your age range" />
                  )}
                  {faces[0].faceAttributes.age < 40 && (
                    <ShowProducts filter="young" gender="female" title="Popular among your age range" />
                  )}
                  {faces[0].faceAttributes.hair.baldness >= 0.5 && (
                    <ShowProducts filter="bald" gender="female" title="Haircare" />
                  )}
                  {faces[0].faceAttributes.accessories.length >= 0 && (
                    <ShowProducts filter="glass" gender="female" title="Glasses" />
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GetFaces;
