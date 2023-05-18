import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../components/style/products.css';

function ProductsDash() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/books')
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:3001/books/' + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  
  const formattedPrice = (price) => {
    return price.toFixed(2);
  };
  

  return (
    <div className="products">
  <div className="headers">
    <h1>Book List</h1>
    <Link to="/BookForm">
      <button className="create">Add New Book</button>
    </Link>
  </div>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Image</th>
        <th>Edit/Delete</th>
      </tr>
    </thead>
    <tbody>
      {books.map((book) => (
        <tr key={book.id}>
          <td>{book.title}</td>
          <td>{formattedPrice(book.price)}$</td>
          <td>{book.numBooks} in stock</td>
          <td>
          {book.image && <img src={`http://localhost:3001/uploads/${book.image}`} alt={book.title} className="product-image"/>}
          </td>
          <td>
            <Link to={`/EditBookForm/${book.id}`}>
              <button className="edit">Edit</button>
            </Link>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default ProductsDash;
