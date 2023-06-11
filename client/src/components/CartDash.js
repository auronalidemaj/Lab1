import { useEffect, useState } from 'react';
import axios from 'axios';

function CartDash() {
  const [selectedBooks, setSelectedBooks] = useState([]);

  useEffect(() => {
    // Fetch the selected books and their quantities from the server
    axios.get(`http://localhost:3001/dashboard/cart`)
      .then((res) => {
        setSelectedBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      {selectedBooks.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>Quantity: {book.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default CartDash;
