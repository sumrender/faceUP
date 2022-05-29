import React from "react";
import "./Loading.css";

const Loading = () => {
  // return (
  //   <div className="spinner">
  //     <span>Loading...</span>
  //     <div className="half-spinner"></div>
  //   </div>
  // );
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <img
          src={require("../../media/Spinner-1s-200px.svg").default}
          alt="loadiing"
        />
      </div>
    </>
  );
};

export default Loading;
