import React from 'react';
import './topBar.css'
import LogoutButton from './logoutButton';


function TopBar({showLogout}) {

  


    return (
      <div className="barContainer">
        <div className="bar">
          React Image Storage Portal
          {showLogout && <LogoutButton text={"Log Out"} />}
        </div>
            
      </div>
    );
  }
  
export default TopBar