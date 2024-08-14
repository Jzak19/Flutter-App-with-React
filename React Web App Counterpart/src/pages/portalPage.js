import './portalPage.css'
import TopBar from '../components/TopBar';
import GridPane from '../components/GridPane'
import { auth } from '../js/firebase'; 
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function PortalPage() {

    const navigate = useNavigate()
    const currentAuth = auth;
    onAuthStateChanged(currentAuth, (user) => {
        if (!user) {
            navigate("/signIn") // if the user tries to access the portal page without a valid login, they will be redirected
        }
    });

  return (    // We check if the user is logged in. That means they are on the portal page, and it gives the option to logout
    <div className="App"> 

        <TopBar showLogout={true}/> 
        <GridPane/>

    </div>
  );
}

export default PortalPage;
