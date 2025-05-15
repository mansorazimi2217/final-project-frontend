import React from "react";
import Tottie from "lottie-react";
import selling from "../assets/selling.json";
import { Link } from "react-router-dom";
import ScrollVelocity from "./ScrollVelocity";
import TrueFocus from "./TrueFocus";
const Bannar = () => {
  return (
    <>
      <div className="w-full flex pt-5 flex-col md:flex-row pb-10">
        <div className="w-full md:w-1/2 p-5">
          <div className="pl-5 md:pl-12 pt-10">
            <h1 className="text-base xs:text-lg sm:text-xl md:text-[3.9rem] lg:text-[3.9rem]">
              The best solution for
            </h1>
            <h1 className="text-primary text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold">
              managing your business <br />
              <div
                className="relative right-5 md:right-[170px] z-[0]"
                style={{ position: "relative" }}
              >
                <TrueFocus
                  sentence="seamlessly "
                  manualMode={false}
                  blurAmount={5}
                  borderColor="red"
                  animationDuration={2}
                  pauseBetweenAnimations={1}
                />
              </div>
            </h1>

            <p className="mt-4 text-base text-sm sm:text-xl md:text-2xl lg:text-[1.5rem] xl:text-[1.5rem]">
              Manage products with ease all in one platform <br />
              Manage products with ease all in one platform <br />
              It's a good platform in Afghanistan.
            </p>

            <Link
              to="/register"
              className="inline-block btn btn-primary btn-lg mt-5 px-6 py-3 text-sm md:text-base"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center p-5">
          <div className="w-full max-w-md drop-shadow-lg">
            <Tottie animationData={selling} className="w-full h-auto" />
          </div>
        </div>
      </div>

      <div className="mb-5">
        <ScrollVelocity
          texts={["Best place to Improve your business   ,  "]}
          className="custom-scroll-text1"
        />
      </div>
    </>
  );
};

export default Bannar;
