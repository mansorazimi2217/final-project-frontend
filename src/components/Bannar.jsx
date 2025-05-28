import React from "react";
import Tottie from "lottie-react";
import selling from "../assets/selling.json";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
const Bannar = () => {
  return (
    <>
      <div
        className="w-full lg:h-screen flex pt-5 flex-col md:flex-row pb-10"
        id="home"
      >
        <div className="w-full mt-20 md:w-1/2 space-y-6 pl-15 md:mt-40  md:pl-40 pr-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-snug mb-5">
            Transform the way you manage your business{" "}
            <span className="text-[#006EBD] block bg:inline">
              S
              <Typewriter
                words={["mart.", "calable.", "eamless."]}
                loop={0}
                cursor
                cursorStyle=" "
                typeSpeed={150}
                deleteSpeed={100}
                delaySpeed={1500}
              />
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:hidden lg:block  md:text-xl max-w-xl leading-relaxed mb-5">
            Empower your workflow with a complete platform to track inventory,
            manage customers, and boost sales. Built for speed, simplicity, and
            businesses that think ahead — whether in Afghanistan or across the
            globe.
          </p>

          <Link
            style={{ textDecoration: "none" }}
            to="/register"
            className="inline-block sm:w-full md:w-full text-center bg-[#006EBD] text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300 text-base font-medium"
          >
            Get Started for Free
          </Link>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center p-5">
          <div className="w-full max-w-md drop-shadow-lg">
            <Tottie animationData={selling} className="w-full h-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bannar;
