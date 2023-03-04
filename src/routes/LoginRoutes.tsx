import MinimalLayout from "layout/MinimalLayout";
import NavMotion from "layout/NavMotion";
import { lazy } from "react";
import Loadable from "ui-component/Loadable";
// project imports
import GuestGuard from "utils/route-guard/GuestGuard";

// login routing
const AuthLogin = Loadable(lazy(() => import("views/authentication/Login")));
const AuthForgotPassword = Loadable(
  lazy(() => import("views/authentication/ForgotPassword"))
);

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: (
    <NavMotion>
      <GuestGuard>
        <MinimalLayout />
      </GuestGuard>
    </NavMotion>
  ),
  children: [
    {
      path: "/login",
      element: <AuthLogin />,
    },
    {
      path: "/forgot",
      element: <AuthForgotPassword />,
    },
  ],
};

export default LoginRoutes;
