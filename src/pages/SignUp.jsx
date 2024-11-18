import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../constants/APIURL";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("userName", formData.userName);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("avatar", formData.avatar); // Ensure avatar file is handled

    try {
      const response = await fetch(`${APIURL}/api/users/register`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign up failed");
      }

      alert("Sign up successful! Login with your credentials now");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-96"
      >
        <h2 className="text-2xl mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <label className="block mb-2">First Name</label>
        <input
          type="text"
          name="firstName"
          className="w-full p-2 border rounded mb-4"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <label className="block mb-2">Last Name</label>
        <input
          type="text"
          name="lastName"
          className="w-full p-2 border rounded mb-4"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-2 border rounded mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label className="block mb-2">Username</label>
        <input
          type="text"
          name="userName"
          className="w-full p-2 border rounded mb-4"
          value={formData.userName}
          onChange={handleChange}
          required
        />
        <label className="block mb-2">Password</label>
        <input
          type="password"
          name="password"
          className="w-full p-2 border rounded mb-4"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label className="block mb-2">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="w-full p-2 border rounded mb-4"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <label className="block mb-2">Avatar</label>
        <input
          type="file"
          name="avatar"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) =>
            setFormData({ ...formData, avatar: e.target.files[0] })
          }
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Sign Up
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="w-full p-2 rounded"
        >
          Already have an account? SignIn?
        </button>
      </form>
    </div>
  );
};

export default SignUp;
