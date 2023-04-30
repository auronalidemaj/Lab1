import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import NewsList from './components/NewsList';
import ContactList from './components/ContactList';
<<<<<<< HEAD
import EditNews from './components/EditNews';
import CreateNews from './components/CreateNews';
=======
import EditContact from './components/EditContact';
import CreateUser from './components/CreateUser';
import EditUser from "./components/EditUser";
>>>>>>> 760a60bb4527fbce0f5f7bee9327380a874e08f0
import Home from "./pages/Home";
import Login from "./pages/Login";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'
// <<<<<<< HEAD
import EditBookForm from './components/EditBookForm';
// =======

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
      <Route path="/CreateUser" element={<CreateUser />} />
      <Route path="/EditUser/:id" element={<EditUser/>} />
      <Route path="/EditBookForm/:id" element={<EditBookForm />} />
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="news" element={<News/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="newsList" element={<NewsList/>}/>
      <Route path="contactList" element={<ContactList/>}/>
      <Route path="/news/:id/edit" element={<EditNews/>}/>
      <Route path="/create-news" element={<CreateNews/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
