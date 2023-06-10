import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import NewsList from './components/NewsList';
import ContactList from './components/ContactList';
import EditNews from './components/EditNews';
import CreateNews from './components/CreateNews';
import CreateUser from './components/CreateUser';
import EditUser from "./components/EditUser";
import Confirmation from "./components/Confirmation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import News from "./pages/News";
import Contact from "./components/Contact";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'
import EditBookForm from './components/EditBookForm';
import BookForm from './components/BookForm';
import FullArticle from './pages/FullArticle';






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
      <Route path="/blog" element={<News/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="newsList" element={<NewsList/>}/>
      <Route path="contactList" element={<ContactList/>}/>
      <Route path="/news/:id/edit" element={<EditNews/>}/>
      <Route path="/create-news" element={<CreateNews/>}/>
      <Route path="/news/:id" element={<FullArticle/>} />
      <Route path="/confirm/:confirmationToken" element={<  Confirmation/>} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
