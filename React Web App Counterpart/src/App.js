import './App.css';
import PortalPage from './pages/portalPage';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return(
    <>
   
    <Router>

        <Routes>
          <Route path='/portalPage' exact element={<PortalPage />} />
          <Route path='/signUp' exact element={<SignUp />} />
          <Route path='/signIn' exact element={<SignIn />} />
        </Routes>
     
    </Router>
  </>
  )

}

export default App;
