import React from 'react'
import { auth } from "../auth/firebase";
import { Navigate } from "react-router-dom";

const RequireAuth = ({children, redirectTo}) => {
    return auth.currentUser ? children : <Navigate to={redirectTo} />
}

export default RequireAuth
