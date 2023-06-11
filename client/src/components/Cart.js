import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../components/style/cart.css";



function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [books, setBooks] = useState([]);
  const [numBooks, setNumBooks] = useState(0);


  const handleNumBooksChange = (event) => setNumBooks(parseInt(event.target.value));

  
    useEffect(() => {
      axios
        .get(`http://localhost:3001/cart`)
        .then((res) => {
          console.log(res.data);
          setCartItems(res.data);
          fetchBooks(res.data);
        })
        .catch((err) => console.log(err));
    }, []);
  
    const fetchBooks = (cartItems) => {
      const productIds = cartItems.map((item) => item.productId);
      axios
        .get(`http://localhost:3001/books?id=${productIds.join(",")}`)
        .then((res) => {
          console.log(res.data);
          setBooks(res.data);
        })
        .catch((err) => console.log(err));
    };
  
    
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:3001/cart/${id}`);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };

      const handleBuy = async () => {
        try {
          await axios.post('http://localhost:3001/cart/buy');
          setCartItems([]);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };
      

    if (cartItems.length === 0) {
      return <div>Your cart is empty</div>;
    }
  
    return (
      <div>
        <h2>Shopping Cart</h2>
        {cartItems.map((item, index) => {
          const book = books.find((b) => b.id === item.productId);
          return (
            <div className="containerr" key={index}>
              {book ? (
                <div className="product-container">
                <div className="image-container">
                {book.image && 
                <img
                src={`http://localhost:3001/uploads/${book.image}`}
                alt={book.title} className="book-image"
              />}
              </div>
                <div className='content-container'>
                  <h1>{book.title}</h1>
                  <h3>Author: {book.author}</h3>
                  <h3>Category: {book.category}</h3>
                  <h3>Price: {book.price}$</h3>
                  <p className="product-stock">{item.quantity} books in stock</p>
                </div>

                <label>
                Numbers of books:
                <input type="number" min="0" value={item.numBooks} max={item.quantity.toString()} onChange={handleNumBooksChange} />
                </label>
                <button onClick={() => handleDelete(item.id)}>Remove book</button>
                </div>
              ) : (
                <p>Product details not found</p>
              )}
            </div>
          );
        })}
        <button onClick= {handleBuy}>Buy the chosen books</button>
      </div>
    );
  }

  
export default Cart;
