import React from "react";

export default function Card() {
  return (
    <div className="text-center mt-5">
      {/* Heading Section */}
      <h6 style={{ color: "green", fontWeight: "bold" }}>SERVICES</h6>
      <h2>Providing you with the best recommendations</h2>

      {/* Cards Section */}
      <div className="d-flex justify-content-center gap-4 flex-wrap mt-4" style={{ gap: "20px" }}>
        {/* Card 1 */}
        <div className="card shadow-sm" style={{ width: "250px", height: "360px", border: "none" }}>
          <img src="/imgs/water.png" className="card-img-top" alt="Water" style={{ height: "180px", objectFit: "cover" }} />
          <div className="card-body text-center">
            <h5 className="card-title">Fertilizer Recommedation</h5>
            <p className="card-text">Gravida sodales condimentum pellen tesq accumsan orci quam
            sagittis sapie</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card shadow-sm" style={{ width: "250px", height: "360px", border: "none" }}>
          <img src="/imgs/hand.png" className="card-img-top" alt="Hand" style={{ height: "180px", objectFit: "cover" }} />
          <div className="card-body text-center">
            <h5 className="card-title">Weather forcasting</h5>
            <p className="card-text"> Gravida sodales condimentum pellen tesq accumsan orci quam
            sagittis sapie</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card shadow-sm" style={{ width: "250px", height: "360px", border: "none" }}>
          <img src="/imgs/tractor.png" className="card-img-top" alt="Tractor" style={{ height: "180px", objectFit: "cover" }} />
          <div className="card-body text-center">
            <h5 className="card-title">Nearby store allocation</h5>
            <p className="card-text">Gravida sodales condimentum pellen tesq accumsan orci quam
            sagittis sapie</p>
          </div>
        </div>
      </div>
    </div>
  );
}
