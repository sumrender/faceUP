import axios from "axios";

import {
  DETECT_FACE_FAIL,
  DETECT_FACE_REQUEST,
  DETECT_FACE_SUCCESS,
} from "../constants/faceConstants";

export const detectFace = (image) => async (dispatch) => {
  try {
    dispatch({ type: DETECT_FACE_REQUEST });

    const endpoint = process.env.REACT_APP_FACE_API_ENDPOINT;
    const key = process.env.REACT_APP_FACE_API_KEY;

    const headers = {
      "Ocp-Apim-Subscription-Key": key,
      "Ocp-Apim-Subscription-Region": "centralindia",
      "Content-Type": "application/octet-stream",
    };
    const url = `${endpoint}/face/v1.0/detect?returnFaceLandmarks=true&returnFaceAttributes=age,gender,hair,facialHair,accessories,makeup`;
    const { data } = await axios.post(url, image, { headers });

    dispatch({
      type: DETECT_FACE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DETECT_FACE_FAIL,
      payload: error.response.data.message,
    });
  }
};
