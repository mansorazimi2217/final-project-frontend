import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import lottieLogin from "../../assets/login3.json";
import Lottie from "lottie-react";

import { useLogin } from "../../hooks/useLogin";

const Login2 = () => {
  const [email, setEmail] = useState("");
  const [passwrod, setPassword] = useState("");

  const { toLogin, error, isLoading } = useLogin();

  const navigate = useNavigate();

  const submitHundller = async (e) => {
    e.preventDefault();

    const user = await toLogin(email, passwrod);

    if (user) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div
        className="min-h-screen py-20"
        style={{
          backgroundImage: "linear-gradient(115deg, #006EBD , #F9F9F9)",
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-8/12 bg-white rounded-xl mx-auto shadow-lg onverflow-hidden">
            <div className="w-full lg:w-1/2 px-10 py-12">
              <div className="mb-5">
                <h3 className="text-3xl">Welcome back!</h3>
                <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                  Enter your email & password
                </p>
              </div>

              <div
                id="notauth"
                className="container w-full bg-red-400 text-white p-4  rounded mb-3 "
                style={{ display: "none" }}
              >
                invalid email or password{" "}
                <button
                  className="btn btn-small btn-danger"
                  onClick={() => {
                    document.getElementById("notauth").style.display = "none";
                  }}
                >
                  X
                </button>
              </div>

              <form onSubmit={submitHundller}>
                {error && (
                  <div className="p-4 bg-red-400 text-white rounded mb-3">
                    {error}
                  </div>
                )}
                <div>
                  <label className="mb-2">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="border borer-gray-400 py-1 px-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600 rounded"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <div>
                    <span
                      className="text-red-500 email-error"
                      id="email-error"
                    ></span>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="mb-2">
                    password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="border borer-gray-400 py-1 px-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600 rounded"
                    onChange={(e) => setPassword(e.target.value)}
                    value={passwrod}
                  />
                  <div>
                    <span
                      className="text-red-500 password-error"
                      id="password-error"
                    ></span>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    disabled={isLoading}
                    className="w-full bg-[#006EBD] py-2 text-center text-white rounded"
                  >
                    Submit
                  </button>
                </div>

                <div className="mt-4 flex">
                  <div
                    style={{
                      height: "1px",
                      width: "45%",
                      backgroundColor: "lightgray",
                      marginTop: "15px",
                      marginRight: "5px",
                    }}
                  ></div>
                  <span>or</span>
                  <div
                    style={{
                      height: "1px",
                      width: "45%",
                      backgroundColor: "lightgray",
                      marginTop: "15px",
                      marginLeft: "5px",
                    }}
                  ></div>
                </div>

                <div className="mt-3 text-center">
                  <p>
                    dont have an account?{" "}
                    <span>
                      <Link to={"/register"} className="text text-blue-600">
                        Sign Up
                      </Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
            <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center rounded-xl">
              <Lottie
                animationData={lottieLogin}
                className="w-full"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login2;

// style={{ backgroundImage: `url(${registerimg})` }}
