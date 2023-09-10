import { ROUTE_CONSTANTS } from "../Shared/Routes";
import Login from "../views/Authentication/Login";
import Register from "../views/Authentication/Register";

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