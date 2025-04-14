import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Denied from "../../Pages/Denied";

function RequireAuth() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    console.log(isLoggedIn);

    return isLoggedIn ? <Outlet /> : <Denied/>; 
}

export default RequireAuth;