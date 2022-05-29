import {
  CLEAR_ERRORS,
  DETECT_FACE_FAIL,
  DETECT_FACE_REQUEST,
  DETECT_FACE_SUCCESS,
} from "../constants/faceConstants";

export const faceReducer = (state = { faces: [] }, action) => {
  switch (action.type) {
    case DETECT_FACE_REQUEST:
      return {
        loading: true,
        faces: [],
      };
    case DETECT_FACE_SUCCESS:
      return {
        loading: false,
        faces: action.payload,
        error: null,
      };
    case DETECT_FACE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
