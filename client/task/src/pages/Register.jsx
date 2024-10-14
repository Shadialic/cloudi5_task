import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [role, setRole] = useState("user");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.userName) {
      tempErrors.userName = "User Name is required";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        axiosInstance
          .post("/auth/register", { ...formData, role })
          .then((res) => {
            console.log(res);
            if (res.data.status) {
              handleClear();
              navigate("/login");
            } else {
              toast.error(response.message);
            }
          })
          .catch((err) => {
            toast.error(err);
          });
      } catch (err) {
        toast.error(err)
      }
    }
  };

  const handleClear = () => {
    setFormData({
      userName: "",
      password: "",
    });
    setErrors({});
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-400 relative">
        <h1 className="absolute top-0 left-4 text-black font-bold text-3xl py-4">
          Cloudi5 Tech
        </h1>
      </div>
      <div className="w-1/2 mx-auto pt-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-full">
            <hr className="w-1/4" />
            <span className="mx-4 text-gray-500">Register</span>
            <hr className="w-1/4" />
          </div>
          <button
            onClick={handleClear}
            className="rounded-full bg-gray-300 px-4 py-2"
          >
            Clear
          </button>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto space-y-4"
          >
            <div>
              <label className="font-bold">UserName</label>
              <input
                type="text"
                name="userName"
                placeholder="userName"
                value={formData.userName}
                onChange={handleOnChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.userName && (
                <span className="text-red-400">{errors.userName}</span>
              )}
            </div>
            <div>
              <label className="font-bold">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleOnChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.password && (
                <span className="text-red-400">{errors.password}</span>
              )}
            </div>
            <div>
              <label className="font-bold">Role:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-full py-2"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <button
              onClick={handleClick}
              className="underline text-blue-600 cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Register;
