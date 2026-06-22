import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import DashboardLayout from '../pages/dashboard/index';
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();


    if (pathname === "/user" && isAuthenticated) {
        return <Navigate to="/user/dashboard" />
    }

    return (
        <>
            {isAuthenticated ?
                <DashboardLayout>
                    <Outlet />
                </DashboardLayout>
                : <Navigate to="/auth" />}
        </>
    )
}
