import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./style/products.css";

const EditBookForm = () => {
  const { id } = useParams(); // get the id from the URL
  // const history = useHistory();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [numBooks, setNumBooks] = useState(0);
  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handlePriceChange = (event) => setPrice(parseFloat(event.target.value));
  const handleNumBooksChange = (event) => setNumBooks(parseInt(event.target.value));

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

  useEffect(() => {
    axios.get(`http://localhost:3001/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setCategory(response.data.category);
        setAuthor(response.data.author);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setNumBooks(response.data.numBooks);
        setImageSrc(response.data.image);
      })
      .catch((error) => {
        console.error(error);
        setError("Error occurred while fetching the book details.");
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/books/${id}`, {
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
        alert("Book updated successfully!");
        // history.push("/");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred while updating the book.");
      });
  };

  return (
    <div>
      <h1>Edit Book:</h1>
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
          <button type="submit">Update Book</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};
export default EditBookForm;
             
