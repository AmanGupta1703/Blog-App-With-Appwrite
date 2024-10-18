import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/useAuth";
import authService from "../../appwrite/Auth";
import { Input, Button } from "../../components";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuth();

  function handleSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    if (!formData.get("email") || !formData.get("password")) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    const { email, password } = Object.fromEntries(formData);

    authService
      .login({ email, password })
      .then(() => {
        authService.getCurrentUser().then((user) => {
          if (!user) {
            toast.error("Failed to log in");
            navigate("/login");
            return;
          }

          toast.success("Logged in successfully");
          dispatch({ type: "AUTH/LOGIN", payload: user });
          navigate("/");
        });
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }

  function onInputChange(ev) {
    const { name, value } = ev.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  return (
    <section className="flex justify-center">
      <article className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          <fieldset className="space-y-6">
            {/* <!-- Email --> */}
            <Input
              label="Email"
              value={formData.email}
              type="email"
              name="email"
              placeholder="Enter your email address"
              onChange={onInputChange}
            />

            {/* <!-- Password --> */}
            <Input
              label="Password"
              value={formData.password}
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={onInputChange}
            />

            {/* <!-- Login Button --> */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition transform hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-95">
                {loading ? "Logging..." : "Log in"}
              </Button>
            </div>
          </fieldset>

          {/* <!-- Sign Up Link --> */}
          <footer className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-indigo-600 hover:underline">
                Sign up here
              </Link>
            </p>
          </footer>
        </form>
      </article>
    </section>
  );
}

export default LoginPage;
