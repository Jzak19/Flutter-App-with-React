import React from 'react';
import './logoutButton.css'
import { auth } from '../js/firebase'; // Adjust the import path as necessary
import { signOut } from 'firebase/auth';

function LogoutButton({text}) {

    const handleLogout = async () => {

        const currentAuth = auth;
        signOut(currentAuth).then(() => {
            console.log("signed out")
          }).catch((error) => {
            console.log(error)
          });
    }


    return (

        <div className="logoutButtonWrapper">
            <button onClick={handleLogout} style={{backgroundColor:"red"}}>{text}</button>
        </div>

    );
  }
  
export default LogoutButton