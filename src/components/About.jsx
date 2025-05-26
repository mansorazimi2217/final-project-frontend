import React from "react";
import "./About.css";
import img1 from "../assets/regsiter.jpg";
import img2 from "../assets/why02.jpg";

const About = () => {
  return (
    <div className="w-full bg-gray-100 py-12 md:py-16">
      <div className="w-fullcontainer mx-auto px-4 md:px-6 lg:px-8 mb-12 md:mb-16 text-center flex row justify-center">
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-gray-900 mb-4 leading-tight">
          Here's what drives us and why we built this system
        </h1>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-12 md:mb-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Empowering Store Owners
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              We aim to simplify daily store operations by giving store owners
              full control over their inventory, products, and orders—anytime,
              anywhere. Our system is designed to reduce manual work, minimize
              errors, and improve decision-making with real-time data.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img
              src={img1}
              alt="Store owner using our system"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Smart Inventory, Smarter Business
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Our mission is to help businesses grow by offering a smart
              inventory solution that ensures stock availability, reduces waste,
              and prevents overstocking. With automated alerts and real-time
              tracking, managing inventory has never been easier.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img
              src={img2}
              alt="Inventory management dashboard"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
