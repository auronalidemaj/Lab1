import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/productsPage.css";
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
  <div className="products-container">
    {books.length > 0 &&
      books
        .filter((book) => book.category === categoryFilter || categoryFilter === "")
        .filter((book) => book.author === authorFilter || authorFilter === "")
        .map((book) => (
          <div key={book.id} className="product-card">
            <div className="product-image-container">
              {book.image && <img src={book.image} alt={book.title} className="product-image" />}
            </div>
            <div className="product-details-container">
              <h2 className="product-title">{book.title}</h2>
              <p className="product-stock">In stock: {book.numBooks}</p>
              <p className="product-price">Price: {book.price}</p>
            </div>
            <div className="product-buttons-container">
              <Link to={`/ProductDetails/${book.id}`}>
                <button className="product-button product-details-button">Details</button>
              </Link>
              <Link to="/wishlist">
                <button className="product-button product-wishlist-button">Add to Wishlist</button>
              </Link>
            </div>
          </div>
        ))}
  </div>
</div>

  );
}

export default Products