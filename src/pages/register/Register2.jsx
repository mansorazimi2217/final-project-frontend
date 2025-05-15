import React, { useState } from "react";
import { Link } from "react-router-dom";
import lottieLogin from "../../assets/register.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

const Register2 = () => {
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [bname, setbName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [passwrod, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const { signup, isLoading, error } = useSignup();
  const navigate = useNavigate();

  const hundleSubmit = async (e) => {
    e.preventDefault();

    const user = await signup(
      fname,
      lname,
      bname,
      phone,
      email,
      city,
      province,
      passwrod,
      confirm
    );

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
          <div className="flex flex-col lg:flex-row w-10/12 bg-white rounded-xl mx-auto shadow-lg onverflow-hidden">
            <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center rounded-xl">
              <Lottie animationData={lottieLogin} />
            </div>

            <div className="w-full lg:w-1/2 px-10 py-12">
              <h2 className="text-3xl mb-4 ">Register</h2>
              <p className="mb-3">register now and use from 100% free !</p>
              <form action={"#"} onSubmit={hundleSubmit}>
                {error && (
                  <div className="bg-red-300 text-white p-4 rounded mb-3">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Owner Name"
                    className="border border-gray-400 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={(e) => setfName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Owner Last Name"
                    className="border border-gray-400 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={(e) => setlName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Business Name"
                    className="border borer-gray-400 py-1 px-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={(e) => setbName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <input
                    type="number"
                    placeholder="Contact Number"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="email"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <h6 className="mt-3" style={{ color: "gray" }}>
                  Address
                </h6>
                <div className="grid grid-cols-2 gap-3 ">
                  <select
                    className="border border-gray-400 py-1 px-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                    defaultValue=""
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a city
                    </option>
                    {[
                      "Aadghis",
                      "Konar",
                      "Kabul",
                      "Herat",
                      "Mazar",
                      "Parwan",
                      "Kapisa",
                      "Helmand",
                    ].map((city) => (
                      <option
                        key={city.toLowerCase().replace(" ", "-")}
                        value={city.toLowerCase().replace(" ", "-")}
                      >
                        {city}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="state"
                    className="border border-gray-400 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <input
                    type="password"
                    placeholder="password"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <button
                    disabled={isLoading}
                    className="w-full bg-[#006EBD] py-2 text-center text-white"
                  >
                    Submit
                  </button>

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
                      All ready have an account?{" "}
                      <span>
                        <Link to={"/login"} className="text text-blue-600">
                          Login
                        </Link>
                      </span>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register2;
