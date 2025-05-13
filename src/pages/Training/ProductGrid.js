import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductGrid.css";

// Import images
import product20 from '../products/worker.jpg';
import product21 from '../products/worker4.jpg';
import product22 from '../products/globe4.jpg';

const ProductGrid = () => {
    const products = [
        { id: 1, title: "Professional Audit", image: product20 },
        { id: 2, title: "Workplace Solutions", image: product21 },
        { id: 3, title: "Environmental Care", image: product22 },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
      <div className="product-carousel-container">
          <div className="product-carousel-inner">
              <Slider {...settings}>
                  {products.map((product) => (
                      <div key={product.id} className="product-card">
                          <div className="card-content">
                              <img
                                  src={product.image}
                                  alt={product.title}
                                  className="product-image"
                              />
                              <h3 className="product-title">{product.title}</h3>
                          </div>
                      </div>
                  ))}
              </Slider>
          </div>
      </div>
  );
};
export default ProductGrid;