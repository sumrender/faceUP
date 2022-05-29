import React, { useEffect } from "react";
// import dummy_data from "./ListData.json"
import CarouselCard from "./CarouselCard";
import "./CarouselSelf.css";
import { clearErrors, getProduct } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading/Loading";

function CarouselSelf({ filter = "all", faces = [], gender = "all" }) {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error]);

  let genderSort = products.filter((el) => {
    switch (gender) {
      case "all":
        return el;
      case "male":
        return el.category.toLowerCase().includes("men");
      case "female":
        return el.category.toLowerCase().includes("female");
      default:
        return el;
    }
  });

  // filter data
  let filteredData = genderSort.filter((el) => {
    switch (filter) {
      case "moustache":
        return el.category.toLowerCase().includes("moustache");
      case "beard":
        return el.category.toLowerCase().includes("beard");
      case "ancient":
        return el.category.toLowerCase().includes("ancient");
      case "young":
        return el.category.toLowerCase().includes("young");
      case "bald":
        return el.category.toLowerCase().includes("bald");
      case "glass":
        return el.category.toLowerCase().includes("glass");
      default:
        return el;
    }
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="carousel-page">
          <div className="grid-cols-4	">
            {products.length > 0 &&
              filteredData.map((i) => {
                return (
                  <div key={parseInt(Math.random() * 4000)}>
                    <CarouselCard product={i} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

export default CarouselSelf;
