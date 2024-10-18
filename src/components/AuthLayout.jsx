import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function AuthLayout({ authentication = true, children }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (authentication && isLoggedIn !== authentication) {
        navigate("/login");
      } else if (!authentication && isLoggedIn !== authentication) {
        navigate("/");
      }
    },
    [isLoggedIn, authentication, navigate],
  );

  return <>{children}</>;
}

export default AuthLayout;
