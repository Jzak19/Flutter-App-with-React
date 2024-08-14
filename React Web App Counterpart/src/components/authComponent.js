import React, {useState} from 'react';
import './authComponent.css'
import TextInput from './textInput';
import AuthButton from './authButton';
import { auth } from '../js/firebase'; // Adjust the import path as necessary
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function AuthComponent({title, text, buttonText, addText, setRedirect, authType}) { // The main auth component for the app. It is able to be set up for both login and sign up purposes

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async () => { // Handle Sign Up function checks if the user is signing up or signing in, and makes the button perform appropriate actions

            if (authType === "signUp") { 
            try {
                
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // Signed in 
                const user = userCredential.user;
                console.log('User registered:', user);
                // Redirect or display success message
                navigate("/signIn")
                
            } catch (error) {
                setError(error.message);
                console.error('Error signing up:', error);

                console.log(error)
            }
        } else {
            try {
                
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                // Signed in 
                const user = userCredential.user;
                console.log('User signed In:', user);
                // Redirect or display success message
                navigate("/portalPage")
                
            } catch (error) {
                setError(error.message);
                console.error('Error signing up:', error);

                console.log(error)
            }
        }
    
    } 

    return (
        

        <div className="authBorder">
            <div className="authTitle">{title}</div>
            <div className="authText">{text}</div>

            <TextInput text={"Email"} value={email} passOrtext={"text"} onChange={(e) => setEmail(e.target.value)}/>
            <TextInput text={"Password"} value={password} passOrtext={"password"} onChange={(e) => setPassword(e.target.value)}/>

            {error && <div className="errorText">{error}</div>}

            <div className="buttonWrapper">
                <AuthButton text={buttonText} clicked={handleSignUp}/>
            </div>

            <div className="additionalText">
                <a href={setRedirect}>{addText}</a>
            </div>
            
        </div>


    );
  }
  
export default AuthComponent