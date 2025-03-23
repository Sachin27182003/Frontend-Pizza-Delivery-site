import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import PizzaImage1 from '../assets/Images/pizza1.png';
import { Link } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";

function Layout({ children }) {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  async function handleLogout(e){

    e.preventDefault();
    await dispatch(logout());

  }

  return (
    <div>
      <nav className="flex items-center justify-around h-16 text-[#6B7280] font-mono border-none shadow-md ">

        <div className="flex items-center justify-center">
            <img className="w-[65px] h-[65px]" src={PizzaImage1} alt="Pizza logo" />
            <p>Pizza Site</p>
        </div>
        <div className="hidden md:block">
            <ul className="flex gap-9">

                <li className="hover:text-[#FF9110]">
                    { ' ' }
                    <p > Menu</p>

                </li>
                <li className="hover:text-[#FF9110]">
                    { '    ' } 
                    <p > Services </p>

                </li>
                <li className="hover:text-[#FF9110]">
                    { ' ' }
                    <p > About</p>

                </li>

            </ul>

        </div>

        <div>
          <ul>
            <li>
              {isLoggedIn ? (
                <Link onClick={handleLogout} >Logout</Link>
              ) : (
                <Link to="/auth/signin/" >Login</Link>
              )}
            </li>
          </ul>
        </div>

      </nav>

      {children}

    <div className="w-full h-1"></div>  
    <footer className="w-full h-1">
        <Footer/>
    </footer>
    </div>
  );
}

export default Layout;
