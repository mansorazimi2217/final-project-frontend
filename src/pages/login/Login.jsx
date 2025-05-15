import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="d-flex bg-primary vh-100 justify-content-center align-items-center">
        <div
          className="w-40 bg-white rounded p-5"
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div className="container text-center">
            <h3>LOGIN</h3>
          </div>
          <div>
            <form>
              <div className="row">
                <div className="col-sm-12 mb-4">
                  <label className="form-label" htmlFor="email">
                    Email<span className="text-danger">*</span>
                  </label>
                  <input className="form-control" type="email" required />
                </div>

                <div className="col-sm-12 mb-4">
                  <label className="form-label" htmlFor="email">
                    Email<span className="text-danger">*</span>
                  </label>
                  <input className="form-control" type="email" required />
                </div>

                <div className="col-sm-12 text-center">
                  <Link className="btn btn-primary w-100 mb-4">SIGN IN</Link>
                  <p>
                    don't have an account?{" "}
                    <span className="text-primary">
                      <Link to="/register">Sign Up</Link>
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
