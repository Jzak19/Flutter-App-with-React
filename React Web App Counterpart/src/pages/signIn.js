import './signUp.css'
import TopBar from '../components/TopBar';
import AuthComponent from '../components/authComponent';


function SignIn() {
  return (    
    <div className="signInPage">

        <TopBar></TopBar>
        
        <AuthComponent title={"Sign In!"} text={"Sign in with your existing credentials."} buttonText={"Sign In"} addText={"If you don't have an account yet, click here to Sign Up"} setRedirect={"/signUp"} authType={"signIn"}/>


    </div>
  );
}

export default SignIn;
