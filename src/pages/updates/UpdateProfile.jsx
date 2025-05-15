import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfileImage = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    console.log(token);

    try {
      const res = await fetch("http://localhost:3000/update-profile-image", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT manually set 'Content-Type' for FormData
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload profile image.");
      }

      console.log(data);

      user.profileImage = data.profileImage;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Update Profile Image
        </h2>

        {file ? (
          <div className="flex justify-center mb-6">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-300 shadow-md"
            />
          </div>
        ) : (
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            className="block w-full text-sm text-gray-700 
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100
            cursor-pointer
            mb-4"
          />

          <button
            onClick={handleUpload}
            disabled={!file}
            className={`w-full py-3 rounded-full font-semibold transition duration-300 ${
              file
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {file ? "Upload Image" : "Select an Image First"}
          </button>
          <button
            onClick={() => {
              navigate("/dashboard");
            }}
            className={`w-full py-3 rounded-full bg-red-600 text-white mt-3 font-semibold transition duration-300`}
          >
            cancle
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileImage;
