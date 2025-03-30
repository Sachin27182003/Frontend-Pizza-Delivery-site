import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Denied from "../../Pages/Denied";

function RequireAuth() {
    const { isLoggedIn } = useSelector((state) => state.auth);

    return isLoggedIn ? <Outlet /> : <Denied/>; 
}

export default RequireAuth;