import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../redux/actions/productAction";
import Loading from "../loading/Loading";
import ProductCard from "./ProductCard.jsx";
import "./Products.css";

const categoryName = ["All", "Face", "Glasses", "Hair", "Makeup"];

function List() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState(0);
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error]);

  // filter data
  let filteredData = products.filter((el) => {
    switch (categories) {
      case 0:
        return el;
      case 1:
        return el.category.toLowerCase().includes("face");
      case 2:
        return el.category.toLowerCase().includes("glasses");
      case 3:
        return el.category.toLowerCase().includes("hair");
      case 4:
        return el.category.toLowerCase().includes("makeup");
      default:
        return el;
    }
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="products-page">
            <div className="filters">
              <div className="cats pt-8 flex flex-col space-y-3">
                {categoryName.map((category, index) => {
                  return (
                    <span
                      className="filter-bar-item cursor-pointer font-bold"
                      onClick={() => {
                        setCategories(index);
                      }}
                    >
                      {category}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="products-gallery">
              {filteredData.map((product, index) => {
                return <ProductCard key={index} product={product} />;
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default List;
