import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import DashboardLayout from '../pages/dashboard/index';

export default function ProtectedRoute() {
    const isLogin = true;
    const { pathname } = useLocation();


    if (pathname === "/user" && isLogin) {
        return <Navigate to="/user/dashboard" />
    }

    return (
        <>
            {isLogin ?
                <DashboardLayout>
                    <Outlet />
                </DashboardLayout>
                : <Navigate to="/auth" />}
        </>
    )
}
