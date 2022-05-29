import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useDispatch } from "react-redux";
import { detectFace } from "../../redux/actions/faceAction";

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

const WebcamUpload = ({ setWebcam, setImageURL }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageURL(imageSrc);
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blobData) => {
        dispatch(detectFace(blobData));
      });
    setWebcam(false);
  }, [webcamRef]);

  return (
    <div className="WEBCAM-UPLOAD">
      <div>
        {image === "" ? (
          <Webcam
            audio={false}
            height={210}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={210}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={image} alt="webcam capture" />
        )}
      </div>
      <div>
        {image !== "" ? (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                setImage("");
              }}
              className="bg-green-300 p-2 rounded-sm"
            >
              Retake Image
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(image);
              }}
              className="bg-green-300 p-2 rounded-sm mx-3"
            >
              Copy Link
            </button>
          </>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="bg-green-300 p-2 rounded-sm"
          >
            Capture
          </button>
        )}
      </div>
    </div>
  );
};
export default WebcamUpload;
