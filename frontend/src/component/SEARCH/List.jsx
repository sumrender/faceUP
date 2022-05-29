import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, getProduct } from "../../redux/actions/productAction";
import Loading from "../loading/Loading";

function List({ searchQuery }) {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error]);

  // filter data
  const filteredData = products.filter((el) => {
    //if no input the return the original
    if (searchQuery === "") {
      return el;
    } else {
      return (
        el.name.toLowerCase().includes(searchQuery) ||
        el.category.toLowerCase().includes(searchQuery)
      );
    }
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="carousel">
            <div className="carousel-items">
              <>
                {filteredData.map((product, index) => {
                  let desc = product.description;
                  if (desc.length > 40) {
                    desc = desc.substring(0, 40);
                  }
                  return (
                    <Link to={`/product/${product._id}`}>
                      <div className="carousel-item mt-3">
                        <img src={product.images[0]} alt="product" />
                        <div className="carousel-item-details">
                          <p className="item-name">{product.name}</p>
                          <p className="item-price">₹ {product.price}</p>
                          <p className="item-details">{desc}...</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default List;
