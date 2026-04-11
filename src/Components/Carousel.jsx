import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

 
  const banners = [
    {
      id: 1,
      title: "BIG FASHION FESTIVAL",
      subtitle: "50-80% OFF",
      bgColor: "#FF3F6C",
      text: "Extra 500 Off on 2999"
    },
    {
      id: 2,
      title: "MEN'S FASHION",
      subtitle: "Starting at Rs.399",
      bgColor: "#14B8A6",
      text: "New Arrivals"
    },
    {
      id: 3,
      title: "WOMEN'S COLLECTION",
      subtitle: "Up to 60% OFF",
      bgColor: "#F59E0B",
      text: "Kurtas & Dresses"
    },
    {
      id: 4,
      title: "KIDS WEAR",
      subtitle: "Flat 50% OFF",
      bgColor: "#8B5CF6",
      text: "Boys & Girls"
    },
    {
      id: 5,
      title: "HOME ESSENTIALS",
      subtitle: "Min 40% OFF",
      bgColor: "#10B981",
      text: "Bed & Bath"
    }
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <div 
              className="carousel-slide" 
              style={{ backgroundColor: banner.bgColor }}
            >
              <div className="carousel-content">
                <h2 className="carousel-title">{banner.title}</h2>
                <p className="carousel-subtitle">{banner.subtitle}</p>
                <p className="carousel-text">{banner.text}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
