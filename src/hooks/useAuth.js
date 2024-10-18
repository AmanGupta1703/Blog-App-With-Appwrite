import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

function useAuth() {
  const contexts = useContext(AuthContext);

  if (!contexts) throw Error("useAuth must be used within an AuthProvider");

  return contexts;
}

export { useAuth };
