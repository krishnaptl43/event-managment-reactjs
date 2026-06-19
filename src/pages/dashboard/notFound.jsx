import React from 'react'
import { Navigate } from 'react-router'

export default function NotFound() {
    return <Navigate to="/user/dashboard" />
}
