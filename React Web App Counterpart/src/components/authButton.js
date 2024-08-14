import React from 'react';
import './authButton.css'

function AuthButton({text, clicked}) {
    return (
        

        <div className="buttonWrapper">
            <button onClick={clicked}>{text}</button> 
        </div>

    );
  }
  
export default AuthButton