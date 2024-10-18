import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import authService from "../../appwrite/Auth";
import { Input, Button } from "../../components";

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  function handleSubmit(ev) {
    ev.preventDefault();
    setLoading(true);
    const formData = new FormData(ev.target);

    if (!formData.get("name") || !formData.get("email") || !formData.get("password")) {
      alert("Please fill in all fields");
      return;
    }

    const { email, password, name } = Object.fromEntries(formData);

    authService
      .createAccount({ email, password, name })
      .then((user) => {
        if (!user) {
          alert("Failed to create account");
          return;
        }
        dispatch({ type: "AUTH/LOGIN", payload: user });
        navigate("/");
      })
      .finally(() => setLoading(false));
  }

  function onInputChange(ev) {
    if (!ev.target.value) return;

    setFormData((prevFormData) => ({ ...prevFormData, [ev.target.name]: ev.target.value }));
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Create an Account</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={onInputChange}
          />

          {/* Email Address */}
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={onInputChange}
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={onInputChange}
          />

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition transform hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-95">
              {loading ? "Loading..." : "Create Account"}
            </Button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
