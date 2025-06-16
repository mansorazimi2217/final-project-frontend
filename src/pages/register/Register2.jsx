import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import lottieLogin from "../../assets/register.json";
import { useSignup } from "../../hooks/useSignup";
import afghanistanProvinces from "./AfghanistanProvinces";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register2 = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    bname: "",
    phone: "",
    email: "",
    province: "",
    district: "",
    password: "",
    confirm: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    bname: "",
    phone: "",
    email: "",
    province: "",
    district: "",
    password: "",
    confirm: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: "gray",
  });

  const { signup, isLoading, error } = useSignup();
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [showDistrictSelect, setShowDistrictSelect] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return "Please enter a valid email address";

    const disposableDomains = [
      "tempmail",
      "mailinator",
      "guerrillamail",
      "10minutemail",
      "throwawaymail",
      "fakeinbox",
    ];
    const domain = email.split("@")[1];
    if (disposableDomains.some((d) => domain.includes(d))) {
      return "Disposable email addresses are not allowed";
    }

    if (email.length > 254) return "Email is too long (max 254 characters)";
    return "";
  };

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    if (!cleaned) return "Phone number is required";
    if (!/^(07\d{8}|93\d{9})$/.test(cleaned)) {
      return "Please enter a valid Afghan phone number (07XXXXXXXX or +93XXXXXXXXX)";
    }
    return "";
  };

  const validateName = (name, field) => {
    if (!name.trim()) return `${field} is required`;
    if (name.length < 2) return `${field} must be at least 2 characters`;
    if (name.length > 50) return `${field} is too long (max 50 characters)`;
    if (!/^[a-zA-Z\s-]+$/.test(name))
      return `${field} can only contain letters, spaces and hyphens`;
    return "";
  };

  const validateBusinessName = (name) => {
    if (!name.trim()) return "Business name is required";
    if (name.length < 2) return "Business name must be at least 2 characters";
    if (name.length > 100)
      return "Business name is too long (max 100 characters)";
    if (!/^[a-zA-Z0-9\s\-.,'&]+$/.test(name)) {
      return "Business name contains invalid characters";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/\d/.test(password))
      return "Password must contain at least one number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character";
    }

    const lowerPass = password.toLowerCase();
    if (
      lowerPass.includes(formData.fname.toLowerCase()) ||
      lowerPass.includes(formData.lname.toLowerCase()) ||
      lowerPass.includes(formData.email.split("@")[0].toLowerCase())
    ) {
      return "Password should not contain your personal information";
    }

    return "";
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    let message = "Very Weak";
    let color = "red";

    // Length check
    if (password.length >= 8) score++;
    // Uppercase check
    if (/[A-Z]/.test(password)) score++;
    // Number check
    if (/\d/.test(password)) score++;
    // Special char check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    // Length bonus
    if (password.length >= 12) score++;

    switch (score) {
      case 1:
        message = "Weak";
        color = "orange";
        break;
      case 2:
        message = "Moderate";
        color = "yellow";
        break;
      case 3:
        message = "Strong";
        color = "lightgreen";
        break;
      case 4:
      case 5:
        message = "Very Strong";
        color = "green";
        break;
      default:
        message = "Very Weak";
        color = "red";
    }

    return { score, message, color };
  };

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setFormData({ ...formData, province: selectedProvince, district: "" });

    if (selectedProvince) {
      setDistricts(afghanistanProvinces[selectedProvince] || []);
      setShowDistrictSelect(true);
      setErrors({ ...errors, province: "", district: "" });
    } else {
      setShowDistrictSelect(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const toggleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const validateForm = () => {
    const newErrors = {
      fname: validateName(formData.fname, "First name"),
      lname: validateName(formData.lname, "Last name"),
      bname: validateBusinessName(formData.bname),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
      province: formData.province ? "" : "Province is required",
      district:
        formData.province && !formData.district ? "District is required" : "",
      password: validatePassword(formData.password),
      confirm:
        formData.password !== formData.confirm ? "Passwords do not match" : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const sanitizedData = {
      fname: formData.fname.trim(),
      lname: formData.lname.trim(),
      bname: formData.bname.trim(),
      phone: formData.phone.replace(/\D/g, ""),
      email: formData.email.trim().toLowerCase(),
      province: formData.province,
      district: formData.district,
      password: formData.password,
      confirm: formData.confirm,
    };

    const user = await signup(
      sanitizedData.fname,
      sanitizedData.lname,
      sanitizedData.bname,
      sanitizedData.phone,
      sanitizedData.email,
      sanitizedData.district,
      sanitizedData.province,
      sanitizedData.password,
      sanitizedData.confirm
    );

    if (user) {
      navigate("/dashboard");
    }
  };

  // Password strength indicator component
  const PasswordStrengthIndicator = () => {
    return (
      <div className="mt-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-600">Password Strength:</span>
          <span
            className={`text-xs font-medium ${
              passwordStrength.color === "red"
                ? "text-red-500"
                : passwordStrength.color === "orange"
                ? "text-orange-500"
                : passwordStrength.color === "yellow"
                ? "text-yellow-500"
                : passwordStrength.color === "lightgreen"
                ? "text-green-400"
                : "text-green-600"
            }`}
          >
            {passwordStrength.message}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full ${
              passwordStrength.color === "red"
                ? "bg-red-500"
                : passwordStrength.color === "orange"
                ? "bg-orange-500"
                : passwordStrength.color === "yellow"
                ? "bg-yellow-500"
                : passwordStrength.color === "lightgreen"
                ? "bg-green-400"
                : "bg-green-600"
            }`}
            style={{
              width: `${(passwordStrength.score / 5) * 100}%`,
            }}
          ></div>
        </div>
        {formData.password && (
          <ul className="mt-2 text-xs text-gray-600 list-disc list-inside">
            <li
              className={formData.password.length >= 8 ? "text-green-500" : ""}
            >
              At least 8 characters
            </li>
            <li
              className={
                /[A-Z]/.test(formData.password) ? "text-green-500" : ""
              }
            >
              1 uppercase letter
            </li>
            <li
              className={/\d/.test(formData.password) ? "text-green-500" : ""}
            >
              1 number
            </li>
            <li
              className={
                /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
                  ? "text-green-500"
                  : ""
              }
            >
              1 special character
            </li>
          </ul>
        )}
      </div>
    );
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: "linear-gradient(115deg, #006EBD , #F9F9F9)",
      }}
    >
      <div className="flex flex-col lg:flex-row w-11/12 max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden h-[90vh]">
        {/* Left: Lottie */}
        <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-cover p-8">
          <Lottie animationData={lottieLogin} />
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/2 overflow-y-auto p-6 md:p-10">
          <span>
            <Link to={"/"}>{"<--"}Back</Link>
          </span>
          <h2 className="text-3xl mb-4">Register</h2>
          <p className="mb-3">Register now and use from 100% free!</p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-300 text-white p-4 rounded mb-3">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="fname"
                  placeholder="Owner Name"
                  className={`border ${
                    errors.fname ? "border-red-500" : "border-gray-400"
                  } py-1 px-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600`}
                  value={formData.fname}
                  onChange={handleInputChange}
                />
                {errors.fname && (
                  <p className="text-red-500 text-xs mt-1">{errors.fname}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lname"
                  placeholder="Owner Last Name"
                  className={`border ${
                    errors.lname ? "border-red-500" : "border-gray-400"
                  } py-1 px-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600`}
                  value={formData.lname}
                  onChange={handleInputChange}
                />
                {errors.lname && (
                  <p className="text-red-500 text-xs mt-1">{errors.lname}</p>
                )}
              </div>
            </div>

            <div className="mt-3">
              <input
                type="text"
                name="bname"
                placeholder="Business Name"
                className={`border ${
                  errors.bname ? "border-red-500" : "border-gray-400"
                } py-1 px-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600`}
                value={formData.bname}
                onChange={handleInputChange}
              />
              {errors.bname && (
                <p className="text-red-500 text-xs mt-1">{errors.bname}</p>
              )}
            </div>

            <div className="mt-3">
              <input
                type="text"
                name="phone"
                placeholder="Contact Number (07XXXXXXXX or +93XXXXXXXXX)"
                className={`border ${
                  errors.phone ? "border-red-500" : "border-gray-400"
                } px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-600`}
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="mt-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`border ${
                  errors.email ? "border-red-500" : "border-gray-400"
                } px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-600`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <h6 className="mt-3 text-gray-600">Address</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
              <div>
                <select
                  className={`border ${
                    errors.province ? "border-red-500" : "border-gray-400"
                  } py-1 px-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-blue-600`}
                  value={formData.province}
                  onChange={handleProvinceChange}
                >
                  <option value="" disabled>
                    Select a province
                  </option>
                  {Object.keys(afghanistanProvinces).map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
                {errors.province && (
                  <p className="text-red-500 text-xs mt-1">{errors.province}</p>
                )}
              </div>

              <div>
                {showDistrictSelect ? (
                  <>
                    <select
                      name="district"
                      className={`border ${
                        errors.district ? "border-red-500" : "border-gray-400"
                      } py-1 px-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-blue-600`}
                      value={formData.district}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select a district
                      </option>
                      {districts.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.district}
                      </p>
                    )}
                  </>
                ) : (
                  <input
                    type="text"
                    placeholder="Select province first"
                    className="border border-gray-400 py-1 px-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                    disabled
                  />
                )}
              </div>
            </div>

            <div className="mt-3 relative">
              <input
                type={formData.showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={`border ${
                  errors.password ? "border-red-500" : "border-gray-400"
                } px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-600`}
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={toggleShowPassword}
              >
                {formData.showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
              <PasswordStrengthIndicator />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="mt-3 relative">
              <input
                type={formData.showPassword ? "text" : "password"}
                name="confirm"
                placeholder="Confirm Password"
                className={`border ${
                  errors.confirm ? "border-red-500" : "border-gray-400"
                } px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-600`}
                value={formData.confirm}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={toggleShowPassword}
              >
                {formData.showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
              {errors.confirm && (
                <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>
              )}
            </div>

            <div className="mt-4">
              <button
                disabled={isLoading}
                className={`w-full bg-[#006EBD] py-2 text-white rounded hover:bg-blue-700 transition-all ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Processing..." : "Submit"}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-gray-500">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span>or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="mt-3 text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 underline">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register2;
