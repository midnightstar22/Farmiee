import React from 'react';

export default function Carousal() {
  // Define animation as a JS object
  const fadeInStyle = {
    animation: 'fadeInTop 1s ease-out forwards'
  };

  return (
    <div>
      <style>
        {`
          @keyframes fadeInTop {
            from {
              opacity: 0;
              transform: translateY(-50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>

          <div className="carousel-item active">
            <img src="/imgs/farm.jpg" className="d-block w-100" alt="..." style={{ width: '900px', height: '650px', objectFit: 'cover', filter: "brightness(30%)" }} />
            <div className="carousel-caption d-none d-md-block fs-1">
              <h5 style={fadeInStyle}>Did you know?</h5>
              <p style={fadeInStyle}>🌍 Over 50% of crop yields are attributed to proper fertilizer use!</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="/imgs/hero_1.jpg" className="d-block w-100" alt="..." style={{ width: '900px', height: '650px', objectFit: 'cover', filter: "brightness(30%)" }} />
            <div className="carousel-caption d-none d-md-block fs-1">
              <h5 style={fadeInStyle}>Fact</h5>
              <p style={fadeInStyle}>🧪 Plants need 17 essential nutrients to grow healthy and strong!</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="/imgs/hero_3.jpg" className="d-block w-100" alt="..." style={{ width: '900px', height: '650px', objectFit: 'cover', filter: "brightness(30%)" }} />
            <div className="carousel-caption d-none d-md-block fs-1">
              <h5 style={fadeInStyle}>Eco Tip</h5>
              <p style={fadeInStyle}>♻️ Organic fertilizers improve soil health and promote sustainable farming.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="/imgs/hero_4.jpg" className="d-block w-100" alt="..." style={{ width: '900px', height: '650px', objectFit: 'cover', filter: "brightness(30%)" }} />
            <div className="carousel-caption d-none d-md-block fs-1">
              <h5 style={fadeInStyle}>Surprising?</h5>
              <p style={fadeInStyle}>🌱 Some plants, like beans, create their own nitrogen, reducing fertilizer needs!</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="/imgs/hero_2.jpg" className="d-block w-100" alt="..." style={{ width: '900px', height: '650px', objectFit: 'cover', filter: "brightness(30%)" }} />
            <div className="carousel-caption d-none d-md-block fs-1">
              <h5 style={fadeInStyle}>Pro Tip</h5>
              <p style={fadeInStyle}>💡 Applying fertilizers before rainfall helps nutrients reach deeper into the soil.</p>
            </div>
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
