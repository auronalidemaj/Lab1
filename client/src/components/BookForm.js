import React, { useState } from "react";
import axios from "axios";
import "./style/products.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [numBooks, setNumBooks] = useState(0);
  const [imageSrc, setImageSrc] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handlePriceChange = (event) => setPrice(parseFloat(event.target.value));
  const handleNumBooksChange = (event) => setNumBooks(parseInt(event.target.value));
  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageSource = reader.result;
      setImageSrc(imageSource);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/books", {
        image: imageSrc, // Pass the image source to the server
        title: title,
        category: category,
        author: author,
        description: description,
        price: price,
        numBooks: numBooks,
      })
      .then((response) => {
        console.log(response);
        setTitle("");
        setAuthor("");
        setCategory("");
        setDescription("");
        setPrice(0);
        setNumBooks(0);
        setImageSrc("");
        setError("");
        alert("Book added successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred while adding the book.");
      });
  };

  return (
    <div>
      <h1>Add books:</h1>
      <div className="product-form">
        <form onSubmit={handleSubmit}>
          <label>
            Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
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
          <option value="non-fiction">Non-Fiction</option>
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
        <input type="number" min="0" step="0.01" value={price.toString()} onChange={handlePriceChange} />
      </label>
      <br />
      <label>
        Number of books available:
        <input type="number" min="0" value={numBooks.toString()} onChange={handleNumBooksChange} />
      </label>
          <br />
          <button type="submit">Add Book</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default BookForm;
