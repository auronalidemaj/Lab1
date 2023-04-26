import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import ContactList from './components/ContactList';
import EditContact from './components/EditContact';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact';





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
      <Route path="contact" element={<Contact/>}/>
      <Route path="contactList" element={<ContactList/>}/>
      <Route path="/contacts/:id/edit" element={<EditContact/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
