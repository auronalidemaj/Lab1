import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Signup from './pages/Signup';


function App() {
  return (
    <>
  <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="products" element={<Products />} />

    </Routes>
    <Footer/>
    </>
  );
}

export default App;
