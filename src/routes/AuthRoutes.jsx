import { lazy } from "react";
import { ROUTE_CONSTANTS } from "../shared/routes";

const Login = lazy(() => import("../views/Authentication/Login"))
const Register = lazy(() => import("../views/Authentication/Register"))

export const AuthRoutes = [
    {
        path: ROUTE_CONSTANTS.LOGIN,
        element: <Login />,
        title: "Login"  
    },
    {
        path: ROUTE_CONSTANTS.REGISTER,
        element: <Register />,
        title: "Register"  
    },
]