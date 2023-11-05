import './App.scss'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomeScreen from "./pages/HomScreen";
import RegisterScreen from './pages/RegisterScreen';
import RegisterTutorScreen from './pages/RegisterTutorScreen';
import LoginScreen from './pages/LoginScreen';
import LoginTutor from './pages/LoginTutor';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfomationScreen from './pages/InfomationScreen';
import InfomationTutor from './pages/InformationTutor';
import AddLocation from './pages/AddLocation';
import Location from './pages/Location';
import PaymentScreen from './pages/PaymentScreen';
import HistoyScreen from './pages/HistoyScreen';
import ApplyScreen from './pages/ApplyScreen';



function App() {

  return (
    <>
    <BrowserRouter>
        <header>
          <Navbar/>
          <ToastContainer position="bottom-center" limit={1} />
        </header>
          <main>                                                    
            <div className="container-app">
              <Routes>                                                                                                                                                                        
                <Route path="/" element={ <HomeScreen/>  } />
                <Route path="/register" element={ <RegisterScreen/> }/>
                <Route path="/registertutor" element={ <RegisterTutorScreen/> }/>
                <Route path="/login" element={ <LoginScreen/> }/>
                <Route path="/loginTutor" element={ <LoginTutor/> }/>
                <Route path="/information" element={ <InfomationScreen/> }/>
                <Route path="/informationTutor" element={ <InfomationTutor/> }/>
                <Route path="/location" element={ <AddLocation/> }/>
                <Route path="/location/:id" element={ <Location/> }/>
                <Route path="/payment" element={ <PaymentScreen/> }/>
                <Route path="/history/:id" element={ <HistoyScreen/> }/>
                <Route path="/apply/:id" element={ <ApplyScreen/> }/>
              </Routes>
            </div>
          </main>
          <footer>
            เว็บไซต์รวบรวมสถานที่ที่สอนพิเศษ 2023
          </footer>
    </BrowserRouter>
    </>
  )
}

export default App
