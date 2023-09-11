import { ROUTE_CONSTANTS } from "../shared/routes";
import Home from "../views/Authenticated/Home";

export const PrivateRoute = [
    {
        path: ROUTE_CONSTANTS.HOME,
        element: <Home />,
        title: "Home"  
    },
]