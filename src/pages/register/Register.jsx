import React, { useState } from "react";
import "./style.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [fname, setfName] = useState();
  const [lname, setlName] = useState();
  const [bname, setbName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [businessType, setBusinessType] = useState();
  const [passwrod, setPassword] = useState();
  const [confirm, setConfirm] = useState();

  const navigate = useNavigate();

  const submitHundler = (e) => {
    alert("hello");
    e.preventDefault();
    axios
      .post("http://localhost:3000/registernew", {
        firsName: fname,
        lastName: lname,
        business: bname,
        contactNumber: phone,
        email: email,
        city: city,
        province: province,
        businessType: businessType,
        passwrod: passwrod,
        confirmPassword: confirm,
      })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="container">
        <div className="my-5   text-center">
          <img src={logo} width={200} className="mb-4" />
          <h2>register your business</h2>
          <p className="lead">
            please provide all required details to register your business with
            us
          </p>
        </div>
      </div>

      <hr className="text-secondary mb-5"></hr>

      <div className="container ">
        <form onSubmit={submitHundler}>
          <div className="row justify-content-center w-60  mx-auto">
            <h3 className="mt-3">Business Owner</h3>
            <div className="col-sm-6 mb-5">
              <label htmlFor="fname" className="form-label">
                First Name<span className="text-danger">*</span>{" "}
              </label>
              <input
                className="form-control"
                id="fname"
                onChange={(e) => setfName(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className="col-sm-6  mb-4">
              <label htmlFor="lname" className="form-label">
                Last Name<span className="text-danger">*</span>{" "}
              </label>
              <input
                className="form-control"
                id="lname"
                onChange={(e) => setlName(e.target.value)}
                type="text"
              ></input>
            </div>

            <div className="col-sm-12  mb-4">
              <label htmlFor="bname" className="form-label">
                Business Name<span className="text-danger">*</span>{" "}
              </label>
              <input
                className="form-control"
                id="bname"
                onChange={(e) => setbName(e.target.value)}
                type="text"
              ></input>
            </div>

            <div className="col-sm-12  mb-4">
              <label htmlFor="phone" className="form-label">
                Contact Number<span className="text-danger">*</span>{" "}
              </label>
              <input
                className="form-control"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                type="number"
              ></input>
            </div>

            <div className="col-sm-12  mb-4">
              <label htmlFor="email" className="form-label">
                E-mail<span className="text-danger">*</span>{" "}
              </label>
              <input
                className="form-control"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              ></input>
            </div>

            <h3 className="mt-3">Address</h3>
            <div className="col-sm-6  mb-5">
              <label htmlFor="city" className="form-label">
                city <span className="text-danger">*</span>{" "}
              </label>
              <input
                className="form-control"
                id="city"
                onChange={(e) => setCity(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className="col-sm-6  mb-4">
              <label htmlFor="province" className="form-label">
                province/state <span className="text-danger">*</span>{" "}
              </label>
              <input
                className="form-control"
                onChange={(e) => setProvince(e.target.value)}
                id="province"
                type="text"
              ></input>
            </div>

            <div className="col-sm-12  mb-4">
              <label htmlFor="btype" className="form-label">
                Type of Business<span className="text-primary">(manual)</span>{" "}
              </label>
              <input
                onChange={(e) => setBusinessType(e.target.value)}
                className="form-control"
                id="btype"
                type="text"
              ></input>
            </div>

            <div className="col-sm-12  mb-4">
              <label htmlFor="pass" className="form-label">
                Password<span className="text-danger">*</span>{" "}
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control"
                id="pass"
                type="text"
              ></input>
            </div>

            <div className="col-sm-12  mb-5">
              <label htmlFor="confirm" className="form-label">
                Confirm Password<span className="text-danger">*</span>{" "}
              </label>
              <input
                className="form-control"
                id="confirm"
                onChange={(e) => setConfirm(e.target.value)}
                type="text"
              ></input>
            </div>

            <div className="col-sm-4 mb-5">
              <button className="btn btn-primary ">Submit</button>
            </div>

            <div className="col-sm-8 mb-5 "></div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
