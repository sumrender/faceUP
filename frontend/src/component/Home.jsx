import "./Home.css";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Home = () => {
  return (
    <div className="home-page">
      <div className={"top-section"}>
        <div className="top-section-content">
          <p className="top-section-main-text">The care you've always needed</p>
          <p className="top-section-sub-text">A RANGE OF PRODUCTS FOR YOU</p>
        </div>
      </div>

      <div className="quote-after-top">
        MOISTURE IS THE ESSENCE OF WETNESS, AND WETNESS IS THE ESSENCE OF
        BEAUTY.
        <br />
        <Link to="/products">
          Find out more <ArrowForwardIcon />{" "}
        </Link>
      </div>
      <div className=" bg-yellow-200 m-auto">
        <img src={require("../media/1.webp")} alt="Ad banner" className=" m-auto"/>
      </div>

      <div className="categories-container">
        <div className="categories-title">
          <p>Categories</p>
        </div>
        <div className="categories">
          <Link to="/products">
            <div className="category">
              <img
                src={require("../media/woman-makeup.jpg")}
                alt="Woman applying makeup"
              />
              <p>Beauty Products</p>
            </div>
          </Link>

          <Link to="/products">
            <div className="category pt-20">
              <img src={require("../media/man-glasses.jpg")} alt="Sunglasses" />
              <p>Eyecare Products</p>
            </div>
          </Link>
          <Link to="/products">
            <div className="category">
              <img
                src={require("../media/haircare-products.jpg")}
                alt="Man with beard"
              />
              <p>Haircare Products</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="carousel-intro">
        <p
          style={{
            fontSize: ".9rem",
            color: "#495057",
            marginBottom: "1rem",
            fontWeight: "600",
          }}
        >
          Introducing Our Latest Products
        </p>
        <p style={{ fontSize: "1.5rem", fontWeight: "600" }}>
          Limited reservations on upcoming products and restocks.
        </p>
      </div>
      {/* <div className="carousel">
        <div className="carousel-items">
          <div className="carousel-item">
            <img
              style={{ borderRadius: "10px 10px 0px 0px" }}
              src={require("../media/women-applying-makeup.jpg")}
              alt="Woman applying makeup"
            />
            <div className="carousel-item-details">
              <p className="item-name">Name</p>
              <p className="item-price">$40.00</p>
              <p className="item-details">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis sed accusamus inventore blanditiis rerum consequuntur
                necessitatibus tempore et delectus optio?
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <div className="explore-more-section">
        <div className="explore-more-text">
          <p>
            A new shopping <br />
            experience
          </p>
          <Link to="/products">
            Explore products <ArrowForwardIcon />{" "}
          </Link>
        </div>
        <img
          src={require("../media/new-shooping-experience.jpg")}
          alt="New shopping experience"
        />
      </div>
      <div className="ending-section">
        <div className="ending-section-text">
          <p>Self care isn't bad after all</p>
        </div>
        <div className="ending-section-inner">
          <div className="ending-section-item">
            <img src={require("../media/breathe.jpg")} alt="Breathe" />
          </div>
          <div className="ending-section-item">
            <img src={require("../media/women-smiling.jpg")} alt="Smiling" />
          </div>
          <div className="ending-section-item">
            <img
              src={require("../media/womam-with-flower.jpg")}
              alt="Flowers"
            />
          </div>
          <div className="ending-section-item">
            <img
              src={require("../media/woman-applying-lotions.jpg")}
              alt="Lotions"
            />
          </div>
          <div>
            <img
              src={require("../media/people-medidating.jpg")}
              alt="Meditate"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
