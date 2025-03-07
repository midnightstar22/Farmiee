import React from 'react';

export default function Form() {
  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="/imgs/7341255.jpg" className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} alt="Phone image" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                <div className="form-outline mb-4">
                  <input type="email" id="form1Example13" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form1Example13">Email address</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="password" id="form1Example23" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form1Example23">Password</label>
                </div>
                <div className="d-flex justify-content-around align-items-center mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" defaultChecked />
                    <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                  </div>
                  <a href="#!" style={{ backgroundColor: '#5B913B' }}>Forgot password?</a>
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-block"style={{ backgroundColor: '#5B913B' }}>Sign in</button>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>
                <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#5B913B' }} href="#!" role="button">
                  <i className="fab fa-facebook-f me-2"></i>Continue with Facebook

                </a>
                <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#77B254' }} href="#!" role="button">
                  <i className="fab fa-twitter me-2"></i>Continue with Twitter
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
