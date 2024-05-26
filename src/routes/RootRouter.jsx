// components
import PrivateLayout from "../components/Layouts/PrivateLayout";
import PublicLayout from "../components/Layouts/PublicLayout";
import AppLayout from "../components/Layouts/AppLayout";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from './PublicRoute'

// libs
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import React, { Suspense } from "react";

// constants
import { AuthRoutes } from "./AuthRoutes";
import { ROUTE_CONSTANTS } from "../shared/routes";
import { useSelector } from "react-redux";
import { CONSTANTS } from "../shared/constants";


const DEFAULT_AUTHENTICATED_ROUTE = ROUTE_CONSTANTS.HOME;
const DEFAULT_GUEST_ROUTE = ROUTE_CONSTANTS.DASHBOARD;

const Fallback = () => {
	return (
		<>
			<div className='full-page'>loading ...</div>
		</>
	);
};

const GuestRoutes = () => {
	const routes = AuthRoutes.concat(PublicRoute);
	let defaultGuestRoute = {
		path: "*",
		element: <Navigate to={DEFAULT_GUEST_ROUTE} replace />,
		title: "Home",
	};
	routes.push(defaultGuestRoute);
	const routing = useRoutes(routes);
	return (
		<Suspense fallback={<Fallback />}>
			<PublicLayout>{routing}</PublicLayout>
		</Suspense>
	);
};

const AuthenticatedRoutes = () => {
	const routes = PublicRoute.concat(PrivateRoute);
	let defaultRoute = {
		path: "*",
		element: <Navigate to={DEFAULT_AUTHENTICATED_ROUTE} replace />,
		title: "Home",
	};
	routes.push(defaultRoute);
	const routing = useRoutes(routes);
	return (
		<Suspense fallback={<Fallback />}>
			<PrivateLayout>{routing}</PrivateLayout>
		</Suspense>
	)
};

const RootRouter = () => {
	const token = useSelector((state) => state.persistedReducer?.auth?.token) || CONSTANTS.EMPTY_STRING
	const isAuthenticated = !!token;  
	return (
		<BrowserRouter basename={""}>
			<AppLayout isAuthenticated={isAuthenticated}>
				{isAuthenticated ? <AuthenticatedRoutes /> : <GuestRoutes />}
			</AppLayout>
		</BrowserRouter>
	);
};

export default RootRouter;

