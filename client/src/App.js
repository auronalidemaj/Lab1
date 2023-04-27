import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import ContactList from './components/ContactList';
import EditContact from './components/EditContact';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'
// <<<<<<< HEAD
import EditBookForm from './components/EditBookForm';
// =======
import Contact from './pages/Contact';
import BookForm from './components/BookForm';


// >>>>>>> 068b6426850c4212dfb82ba4d02d3015ad1f5b1c



function App() {
  return (
    <>
  <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="products" element={<Products />} />
      <Route path="/ProductDetails/:id" element={<ProductDetails />} />
      <Route path="/BookForm" element={<BookForm />} />
      <Route path="/EditBookForm/:id" element={<EditBookForm />} />
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
