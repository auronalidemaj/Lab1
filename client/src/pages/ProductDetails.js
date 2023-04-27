import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../components/style/products.css";

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
        {book.image && <img src={book.image} alt="" className='book-image' />}
        </div>
        <div className="content-container" key={book.id}>
          <h1>Title: </h1>
          <h3>Author: {book.author}</h3>
          <h3>Category: {book.category}</h3>
          <p>Description: {book.description}</p>
          <h3>Price: {book.price}</h3>
          <button>Add to wishlist</button>
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
