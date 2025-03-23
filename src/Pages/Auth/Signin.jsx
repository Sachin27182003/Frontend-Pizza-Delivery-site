import SigninPresentation from "./SigninPresentation";
import { useState } from "react";
import toast from "react-hot-toast";
import { login } from "../../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signin(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailOrMobileRegex = /^(?:\+91|91)?[6-9]\d{9}$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    function checkInputType(input) {
        const mobileRegex = /^[+\d][\d\s-]*$/; 
        
        if (mobileRegex.test(input)) {
            return "mobileNumber";
        } else {
            return "email";
        }  
    }
    
    const [signinState, setSigninState] = useState({
        email: '',
        mobileNumber: '',
        password: ''
    });

    function validation(){

        if(!emailOrMobileRegex.test(signinState.email) && !emailOrMobileRegex.test(signinState.mobileNumber)){
            toast.error("Please enter a valid Email or Mobile Number");
            return false;
        } else if(!passwordRegex.test(signinState.password)){
            toast.error("Please enter a valid Password");
            return false;
        } else {
           return true; 
        }
    }

    function handleUserInput(e){
        const {name, value} = e.target;
        if(name === "emailorMobileNumber"){
            setSigninState({...signinState, [checkInputType(value)]: value})
        } else {
            setSigninState({...signinState, [name]: value})
        }
        
    }


    async function handleFormSubmit(e){
        e.preventDefault();

        if(validation()){

            const apiResponse = await dispatch(login(signinState));

            if(apiResponse.payload.success){
                navigate('/');
            } else if (apiResponse.payload.statusCode === 404){

                const loadingToast =toast.loading("Redirecting to Signup Page", {
                                            style: {color: 'green'}
                                        })
                
                setTimeout(()=>{
                    navigate('/auth/signup');
                    toast.dismiss(loadingToast);
                }, 2000);
            } 
        }
    }
    
    return (
       <SigninPresentation handleUserInput={handleUserInput} handleFormSubmit={handleFormSubmit} />
    )
}

export default Signin;