import { useState } from 'react';
import toast from 'react-hot-toast';
import SignupPresentation from './SignupPresentation';
import { useDispatch } from 'react-redux';
import { createAccount } from '../../Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';

function Signup(){

    const dispatch = useDispatch();
    const navigator = useNavigate();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mobileNumberRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    
    const [signUpState, setSignUpState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        password: ''
    });
    
    function validation() {
        if(!emailRegex.test(signUpState.email)){
            toast.error("Please enter a valid Email");
            return false;
        } else if(!mobileNumberRegex.test(signUpState.mobileNumber)){
            toast.error("Please enter a valid Mobile Number");
            return false;
        } else if (!passwordRegex.test(signUpState.password)) {
            toast.error("Please enter a valid Password");
            return false;
        } else if(signUpState.name === ''){
            toast.error("Please enter a your Name");
            return false;
        } else {
            return true;
        }
    }
    function handleUserInput(e){
        const {name, value} = e.target;
        setSignUpState({...signUpState, [name]: value});
            
    }

    async function handleFormSubmit(e){
        e.preventDefault();  //prevent the form from reloading the page;

        if(validation()){

            const apiResponse = await dispatch(createAccount(signUpState));
            console.log("apiresponse",apiResponse);

            if(apiResponse.payload.success){
                navigator('/auth/signin');
            } else if (apiResponse.payload.error.statusCode === 409){

                const loadingToast =toast.loading("Redirecting to Signin Page", {
                                            style: {color: 'green'}
                                        })
                
                setTimeout(()=>{
                    navigator('/auth/signin');
                    toast.dismiss(loadingToast);
                }, 2000);
            }
        }

       
    }
    
    return (
        <SignupPresentation handleFormSubmit={handleFormSubmit} handleUserInput={handleUserInput} />
    )  
}

export default Signup;                                                                                  