import './App.css'
import Login from './Components/Login/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import Register from './Components/Cadastro/Cadastro';

function App() {

  return (
    <Router> {/* Envolva suas rotas com Router */}
      <div className="app">
        <Routes> {/* Substitua div por Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
