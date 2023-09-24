
import { lazy } from "react";
import { ROUTE_CONSTANTS } from "../shared/routes";

const Dashboard = lazy(() =>import("../views/Dashboard"))

export const PublicRoute = [
    {
        path: ROUTE_CONSTANTS.DASHBOARD,
        element: <Dashboard />,
        title: "Dashboard"  
    },
]

