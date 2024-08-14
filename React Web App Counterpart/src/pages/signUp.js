import './signUp.css'
import TopBar from '../components/TopBar';
import AuthComponent from '../components/authComponent';


function SignUp() {
  return (    
    <div className="signUpPage">

        <TopBar></TopBar>
        
        <AuthComponent title={"Sign Up!"} text={"If you don't have an account yet, please Sign Up."} buttonText={"Sign Up"} addText={"If you already have an account, click here to Sign In"} setRedirect={"/signIn"} authType={"signUp"}/>


    </div>
  );
}

export default SignUp;
