import { useNavigate } from "react-router-dom";

// project imports
import useAuth from "hooks/useAuth";
import { GuardProps } from "types";
import { useEffect } from "react";

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
    if (isLoggedIn && user?.superUser) {
      navigate("super-user", { replace: true });
    }
  }, [isLoggedIn, navigate, user]);

  return children;
};

export default AuthGuard;
