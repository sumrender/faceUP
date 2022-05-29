const ImageUpload = ({ setImage, setImageURL, setWebcam }) => {
  async function handleImage(img) {
    setImage(img);
    setImageURL(URL.createObjectURL(img));

    // dispatch(detectFace(img));
  }

  return (
    <>
      <div className="upload-image-div">
        <h2>Upload Image</h2>
        <input
          name="inputImage"
          type={"file"}
          multiple
          accept="image/*"
          onChange={(e) => {handleImage(e.target.files[0]);
            setWebcam(false)
          }}
        />
      </div>
    </>
  );
};

export default ImageUpload;
