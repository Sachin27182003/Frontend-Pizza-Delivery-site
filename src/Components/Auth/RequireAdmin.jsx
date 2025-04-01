import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Denied from "../../Pages/Denied";

function RequireAdmin(){
    const { role } = useSelector(state => state.auth);

    if(role === 'admin') {
        return <Outlet />;
    } else {
        return <Denied/>
    }

}

export default RequireAdmin;