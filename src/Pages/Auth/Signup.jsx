import { useState } from 'react';
import toast from 'react-hot-toast';
import SignupPresentation from './SignupPresentation';

function Signup(){

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mobileNumberRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    
    const [signUpState, setSignUpState] = useState({
        name: '',
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

    function handleFormSubmit(e){
        e.preventDefault();  //prevent the form from reloading the page;

        if(validation()){
        toast.success("Account created successfully");
        console.log(signUpState);
        }
    }
    
    return (
        <SignupPresentation handleFormSubmit={handleFormSubmit} handleUserInput={handleUserInput} />
    )  
}

export default Signup;                                                                                  