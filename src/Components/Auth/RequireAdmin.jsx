import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import IsAdmin from "../../Pages/IsAdminPage";

function RequireAdmin(){
    const { role } = useSelector(state => state.auth);

    if(role === 'ADMIN') {
        return <Outlet />;
    } else {
        return <IsAdmin/>
    }

}

export default RequireAdmin;