import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/products.css";
import { Link } from "react-router-dom";

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
            <h2>Categories</h2>
            <ul>
              <li onClick={() => setCategoryFilter("")}>All Categories</li>
              <li onClick={() => setCategoryFilter("fiction")}>Fiction</li>
              <li onClick={() => setCategoryFilter("non-fiction")}>Non-fiction</li>
              <li onClick={() => setCategoryFilter("Children's book")}>Children's book</li>
              <li onClick={() => setCategoryFilter("Category 4")}>Category 4</li>
              <li onClick={() => setCategoryFilter("Category 5")}>Category 5</li>
            </ul>
          </div>
          <div className="authors">
            <h2>Authors</h2>
            <ul>
              <li onClick={() => setAuthorFilter("")}>All Authors</li>
              <li onClick={() => setAuthorFilter("r")}>Author 1</li>
              <li onClick={() => setAuthorFilter("Author 2")}>Author 2</li>
              <li onClick={() => setAuthorFilter("Author 3")}>Author 3</li>
              <li onClick={() => setAuthorFilter("Author 4")}>Author 4</li>
              <li onClick={() => setAuthorFilter("Author 5")}>Author 5</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="content">
        {/* <h1 className="book-list-header">Book List</h1> */}
        <ul className="book-list">
          {books.length > 0 &&
            books
              .filter((book) => book.category === categoryFilter || categoryFilter === "")
              .filter((book) => book.author === authorFilter || authorFilter === "")
              .map((book) => (
                <li key={book.id} className="book-item">
                  {book.image && <img src={book.image} alt="" className="book-image" />}
                  <p className="book-title">Title: {book.title}</p>
                  <p className="book-price">Price: {book.price}</p>
                  <p className="book-stock">{book.numBooks} in stock</p>
                  <div className="book-buttons">
                    <button className="details-btn">
                      <Link to={`/ProductDetails/${book.id}`}>Details</Link>
                    </button>
                    <button className="wishlist-btn">
                      <Link to="/wishlist">Add to Wishlist</Link>
                    </button>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default Products