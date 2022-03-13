import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'
import Register from './components/Register';
import Dashboard from './components/Dashboard';

export const url = "https://login-auth-apiservice.herokuapp.com"
function App() {
  return <>
  <h1 style={{"textAlign":"center"}}>Simple Login Application</h1>
  <Router>

      <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/' element={<Login/>}/>
      </Routes>


  </Router>

  </>
}
export default App;
