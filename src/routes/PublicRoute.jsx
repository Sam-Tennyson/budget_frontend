import { ROUTE_CONSTANTS } from "../Shared/Routes";
import Dashboard from "../views/Dashboard";

export const PublicRoute = [
    {
        path: ROUTE_CONSTANTS.DASHBOARD,
        element: <Dashboard />,
        title: "Dashboard"  
    },
]

