import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/footer'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'



function App() {
  return (
    <>
  <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="products" element={<Products />} />
      <Route path="dashboard" element={<Dashboard/>}/>

    </Routes>
    <Footer/>
    </>
  );
}

export default App;
