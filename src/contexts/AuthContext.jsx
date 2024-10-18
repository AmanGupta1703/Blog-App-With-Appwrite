import React, { createContext, useEffect, useReducer } from "react";

const initialState = JSON.parse(localStorage.getItem("auth")) || {
  isLoggedIn: false,
  user: null,
};

export const AuthContext = createContext();

function authReducer(state, action) {
  switch (action.type) {
    case "AUTH/LOGIN":
      return { ...state, isLoggedIn: true, user: action.payload };
    case "AUTH/LOGOUT":
      return { ...state, isLoggedIn: false, user: null };
    default:
      break;
  }
}

function AuthContextProvider({ children }) {
  const [{ isLoggedIn, user }, dispatch] = useReducer(authReducer, initialState);

  // add the complete initial state to local storage
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify({ isLoggedIn, user }));
  }, [isLoggedIn, user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, dispatch }}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
