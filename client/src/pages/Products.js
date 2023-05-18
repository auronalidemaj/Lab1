import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/productsPage.css";
import { Link } from "react-router-dom";
import { ReactComponent as WishlistIcon } from '../components/icons/wishlist-1.svg';
import image from '../bookmark.png'


const categoryOptions = [
  "Fiction",
  "Non-fiction",
  "Romance",
  "Mystery",
  "Science Fiction",
  "Biography",
  "History",
  "Self-help",
  "Cookbooks",
  "Travel",
  "Art/Photography",
  "Children's Books",
  "Education",
  "Science/Technology",
  "Humor"
];

const authorOptions = [
  "J.K. Rowling",
  "William Shakespeare",
  "Mark Twain",
  "Collen Hoover",
  "Toni Morrison",
  "Virginia Woolf",
  "Fyodor Dostoevsky",
  "Charles Dickens",
  "Franz Kafka",
  "Ernest Hemingway",
  "Edgar Allen Poe",
  "Emily Bronte",
  "Charlotte Bronte"
];

function Products() {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/books${buildQueryString()}`);
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [selectedCategory, selectedAuthor]);

  const buildQueryString = () => {
    let queryString = "";

    if (selectedCategory) {
      queryString += `?category=${selectedCategory}`;
    }

    if (selectedAuthor) {
      queryString += `?author=${selectedAuthor}`;
    }

    return queryString;
  };

  const formattedPrice = (price) => {
    return price.toFixed(2); // Format the price with 2 decimal places
  };
  

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSelectedAuthor(null);
    setCurrentPage(1);
  };

  const handleAuthorFilter = (author) => {
    setSelectedAuthor(author === selectedAuthor ? null : author);
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  const filteredBooks = books.filter((book) => {
    const categoryMatches = !selectedCategory || book.category === selectedCategory;
    const authorMatches = !selectedAuthor || book.author === selectedAuthor;
    return categoryMatches && authorMatches;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredBooks.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <div className="categories-authors-container">
            <div className="categories">
              <h2 onClick={() => handleCategoryFilter("")}><img src={image} className="rotate-image"/>Categories</h2>
              <ul>
                {categoryOptions.map((category) => (
                  <li key={category} onClick={() => handleCategoryFilter(category)} className={selectedCategory === category ? "active" : ""}>
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="authors">
              <h2 onClick={() => handleAuthorFilter("")}><img src={image} className="rotate-image"/>Authors</h2>
              <ul>
                {authorOptions.map((author) => (
                  <li key={author} onClick={() => handleAuthorFilter(author)} className={selectedAuthor === author ? "active" : ""}>
                    {author}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="products-container">
          {currentProducts.map((book) => (
            <div key={book.id} className="product-card">
              <div className="product-image-container">
                {book.image && <img src={`http://localhost:3001/uploads/${book.image}`} alt={book.title} className="product-image" />}
              </div>
              <div className="product-details-container">
                <h3 className="product-title">{book.title}</h3>
                <p className="product-price">{formattedPrice(book.price)}$</p>
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
      <div className="pagination-container">
        <div className="pagination">
          {Array(Math.ceil(filteredBooks.length / productsPerPage))
            .fill()
            .map((_, index) => (
              <button
                key={index}
                className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </div>
    </>
  );
}

export default Products;
