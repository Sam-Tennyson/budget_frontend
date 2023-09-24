import { lazy } from "react";
import { ROUTE_CONSTANTS } from "../shared/routes";

const BudgetHistory =  lazy(() => import("../views/Authenticated/BudgetHistory"))
const Home = lazy(() => import("../views/Authenticated/Home"))

export const PrivateRoute = [
    {
        path: ROUTE_CONSTANTS.HOME,
        element: <Home />,
        title: "Home"  
    },
    {
        path: ROUTE_CONSTANTS.BUDGET_HISTORY,
        element: <BudgetHistory />,
        title: "Budget-History"  
    },
]