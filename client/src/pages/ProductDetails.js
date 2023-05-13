import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../components/style/productDetails.css";
import { ReactComponent as WishlistIcon } from '../components/icons/wishlist-1.svg';
import { ReactComponent as CartIcon } from '../components/icons/cart.svg';
import { Link } from 'react-router-dom';


function ProductDetails() {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/books/${id}`)
      .then((res) => {
        console.log(res.data); 
        setBook(res.data); 
      })
      .catch((err) => console.log(err));
  }, [id]);

  // console.log(book)

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containerr">
    <div className="product-container">
      <div className="image-container">
        {book.image && 
        <img
        src={`http://localhost:3001/uploads/${book.image}`}
        alt={book.title} className="book-image"
      />}
      </div>
      <div className="content-container" key={book.id}>
        <h1>{book.title}</h1>
        <h3>Author: {book.author}</h3>
        <h3>Category: {book.category}</h3>
        <p>Description: {book.description}</p>
        <h3>Price: {book.price}$</h3>
        <div className="buttons-container">
          <Link to="/cart">
            <CartIcon className="cart-icon" />
          </Link>
          <Link to="/wishlist">
            <WishlistIcon className="wishlist-icon" />
          </Link>
        </div>
      </div>
    </div>
  </div>
  

  );
}


export default ProductDetails;
