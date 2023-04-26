import React, { useState } from 'react';
import axios from 'axios';
import './style/products.css';
import { Link, useLocation, useNavigate ,useParams } from 'react-router-dom';

const EditBookForm = () => {
    const [book,setBook]= useState({
        title: "",
        category: "",
        author: "",
        description: "",
        price: "",
        numBooks: "",
    });
    const {bookId} = useParams();

const [title, setTitle] = useState(book.title);
  const [category, setCategory] = useState(book.category);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [price, setPrice] = useState(book.price);
  const [numBooks, setNumBooks] = useState(book.numBooks);
  const [error, setError] = useState('');

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handlePriceChange = (event) => setPrice(parseFloat(event.target.value));
  const handleNumBooksChange = (event) => setNumBooks(parseInt(event.target.value));

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .put(`http://localhost:3001/books/${book.id}`, {
//         title: title,
//         category: category,
//         author: author,
//         description: description,
//         price: price,
//         numBooks: numBooks,
//       })
//       .then((response) => {
//         console.log(response);
//         alert('Book updated successfully!');
//       })
//       .catch((error) => {
//         console.error(error);
//         setError('Error occurred while updating book.');
//       });
//   };

const Navigate = useNavigate()
const location = useLocation()


// const handleChange = (e)=>{
//     setBook ((prev)=> ({...prev,[e.target.name]: e.target.value}));
// };

const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/books/${bookId}`, book);
      Navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Edit Book:</h1>
      <div className="product-form">
        <form>
          <br />
          <label>
            Title:
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
          <br />
          <label>
            Category:
            <select value={category} onChange={handleCategoryChange}>
              <option value="">-- Select a category --</option>
              <option value="fiction">Fiction</option>
              <option              value="non-fiction">Non-Fiction</option>
              <option value="children">Children's Books</option>
            </select>
          </label>
          <br />
          <label>
            Author:
            <input type="text" value={author} onChange={handleAuthorChange} />
          </label>
          <br />
          <label>
            Description:
            <textarea value={description} onChange={handleDescriptionChange} />
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              min="0"
              step="0.01"
              value={price.toString()}
              onChange={handlePriceChange}
            />
          </label>
          <br />
          <label>
            Number of books available:
            <input
              type="number"
              min="0"
              value={numBooks.toString()}
              onChange={handleNumBooksChange}
            />
          </label>
          <br />
          <button type="submit" onClick={handleClick}>Update Book</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditBookForm;

