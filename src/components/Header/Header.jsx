import React from "react";

import { Link, useNavigate } from "react-router-dom";

import authService from "../../appwrite/Auth";
import { useAuth } from "../../hooks/useAuth";
import { Button, NavItem } from "../";

function Header() {
  const { isLoggedIn, user, dispatch } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    authService.logout().then(() => {
      dispatch({ type: "AUTH/LOGOUT" });

      navigate("/");

      alert("Logged out successfully");
    });
  }

  return (
    <header className=" py-4 px-2">
      <div className=" flex items-center justify-between">
        {/* Logo */}
        <h1 className="font-bold text-3xl text-slate-700">
          <Link to="/">Dev Diary</Link>
        </h1>

        {/* Nav */}
        <nav>
          <ul className="flex items-center gap-8">
            {!isLoggedIn ? (
              <>
                <NavItem to="/login">Login</NavItem>
                <NavItem to="/sign-up">Sign up</NavItem>
              </>
            ) : (
              <>
                <NavItem to="/create-post">Create Post</NavItem>
                <NavItem to="/profile">Hello, {user?.name || user?.email}</NavItem>
                <NavItem>
                  <Button onClick={handleLogout}>Logout</Button>
                </NavItem>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
