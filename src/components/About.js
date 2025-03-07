import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";


export default function About() {
  return (
    <section id="about" className="about-section" style={{ backgroundColor: '#166534', padding: '60px 0' }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side - Image */}
          <div className="col-lg-6 text-center">
            <img 
              src="/imgs/img_sq_5.jpg"  
              className="img-fluid "
              style={{ borderRadius: '10px', maxWidth: '100%', height: 'auto' }}
            />
          </div>

          {/* Right Side - Text Content */}
          <div className="col-lg-5 text-white">
            <h3 className="content-subtitle opacity-75">WHY CHOOSE US</h3>
            <p className="opacity-75">
              Reprehenderit, odio laboriosam? Blanditiis quae ullam quasi illum minima nostrum perspiciatis error consequatur sit nulla.
            </p>

            {/* Features List */}
            <div className="my-4">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-cloud-rain me-3" style={{ fontSize: '24px' }}></i>
                <div>
                  <h5 className="m-0">Give the best for your plants</h5>
                  <p className="opacity-75">Lorem ipsum dolor sit amet.</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <i className="bi bi-house me-3" style={{ fontSize: '24px' }}></i>
                <div>
                  <h5 className="m-0">Let's keep a space for plants in your house</h5>
                  <p className="opacity-75">Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
