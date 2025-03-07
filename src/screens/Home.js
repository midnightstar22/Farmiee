import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousal from "../components/Carousal";
import About from "../components/About";
import Services from "../components/Services";


export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousal/>
      </div>
      <div >
       <Services/>
        </div>

      <div >
       <About/>
        </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
