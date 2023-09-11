
import { ROUTE_CONSTANTS } from "../shared/routes";
import Dashboard from "../views/Dashboard";

export const PublicRoute = [
    {
        path: ROUTE_CONSTANTS.DASHBOARD,
        element: <Dashboard />,
        title: "Dashboard"  
    },
]

