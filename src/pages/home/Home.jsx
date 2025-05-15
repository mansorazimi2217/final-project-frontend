import React from "react";
import Bannar from "../../components/Bannar";
import Navbar2 from "../../components/Navbar2";
import Features from "../../components/Features";
import About from "../../components/About";
import Comments from "../../components/Comments";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar2 />
      <Bannar />
      <About />
      <Features />
      <Comments />
      <Footer />
    </>
  );
};

export default Home;
