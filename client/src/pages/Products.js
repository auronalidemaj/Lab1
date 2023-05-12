import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/productsPage.css";
import { Link } from "react-router-dom";
import { ReactComponent as WishlistIcon } from '../components/icons/wishlist-1.svg';


function Products() {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [authorFilter, setAuthorFilter] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/books${selectedCategory ? `?category=${selectedCategory}` : ""}`);
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [selectedCategory]);

  const filteredBooks = books.filter((book) => {
    const categoryMatches = categoryFilter === "" || book.category === categoryFilter;
    const authorMatches = authorFilter === "" || book.author === authorFilter;
    return categoryMatches && authorMatches;
  });

  // const handleCategorySelect = (category) => {
  //   setSelectedCategory(category);
  // };

  // const handleAuthorSelect = (author) => {
  //   setSelectedAuthor(author);
  // };
  return (
<div className="container">
  <div className="sidebar">
    <div className="categories-authors-container">
      <div className="categories">
        <h2 onClick={() => setCategoryFilter("")}>Categories</h2>
        <ul>
          <li onClick={() => setCategoryFilter("fiction")}>Fiction</li>
          <li onClick={() => setCategoryFilter("non-fiction")}>Non-fiction</li>
          <li onClick={() => setCategoryFilter("romance")}>Romance</li>
          <li onClick={() => setCategoryFilter("mystery")}>Mystery</li>
          <li onClick={() => setCategoryFilter("sciencef")}>Science Fiction</li>
          <li onClick={() => setCategoryFilter("biography")}>Biography</li>
          <li onClick={() => setCategoryFilter("history")}>History</li>
          <li onClick={() => setCategoryFilter("self-help")}>Self-help</li>
          <li onClick={() => setCategoryFilter("cookbooks")}>Cookbooks</li>
          <li onClick={() => setCategoryFilter("travel")}>Travel</li>
          <li onClick={() => setCategoryFilter("art")}>Art/Photography</li>
          <li onClick={() => setCategoryFilter("children")}>Children's Book</li>
          <li onClick={() => setCategoryFilter("education")}>Education</li>
          <li onClick={() => setCategoryFilter("science")}>Science/Technology</li>
          <li onClick={() => setCategoryFilter("humor")}>Humor</li>
        </ul>
      </div>
      <div className="authors">
        <h2 onClick={() => setAuthorFilter("")}>Authors</h2>
        <ul>
          <li onClick={() => setAuthorFilter("")}>J.K. Rowling</li>
          <li onClick={() => setAuthorFilter("William Shakespeare")}>William Shakespeare</li>
          <li onClick={() => setAuthorFilter("Mark Twain")}>Mark Twain</li>
          <li onClick={() => setAuthorFilter("Collen Hoover")}>Collen Hoover</li>
          <li onClick={() => setAuthorFilter("Toni Morrison")}>Toni Morrison</li>
          <li onClick={() => setAuthorFilter("Virgina Woolf")}>Virginia Woolf</li>
          <li onClick={() => setAuthorFilter("Fyodor Dostoevsky")}>Fyodor Dostoevsky</li>
          <li onClick={() => setAuthorFilter("Charles Dickens")}>Charles Dickens</li>
          <li onClick={() => setAuthorFilter("Franc Kafka")}>Franz Kafka</li>
          <li onClick={() => setAuthorFilter("Ernest Hemingway")}>Ernest Hemingway</li>
          <li onClick={() => setAuthorFilter("Edgar Allen Poe")}>Edgar Allen Poe</li>
          <li onClick={() => setAuthorFilter("Emily Bronte")}>Emily Bronte</li>
          <li onClick={() => setAuthorFilter("Charlotte Bronte")}>Charlotte Bronte</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="products-container">
  {books
    .filter(book => book.category === categoryFilter || categoryFilter === "")
    .filter(book => authorFilter === "" || book.author === authorFilter)
    .map(book => (
      <div key={book.id} className="product-card">
        <div className="product-image-container">
          {book.image && <img src={`http://localhost:3001/uploads/${book.image}`} alt={book.title} className="product-image"/>}
        </div>
        <div className="product-details-container">
          <h2 className="product-title">{book.title}</h2>
          <p className="product-stock">In stock: {book.numBooks}</p>
          <p className="product-price">{book.price}$</p>
        </div>
        <div className="product-buttons-container">
          <Link to={`/ProductDetails/${book.id}`}>
            <button className="product-button product-details-button">Read more...</button>
          </Link>
          <Link to="/wishlist">
            <WishlistIcon className="wishlist-icon" />
          </Link>
        </div>
      </div>
    ))}
</div>


</div>

  );
}

export default Products