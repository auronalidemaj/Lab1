import React, { useState } from "react";
import axios from "axios";
import "./style/bookform.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [numBooks, setNumBooks] = useState(0);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  
  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handlePriceChange = (event) => setPrice(parseFloat(event.target.value));
  const handleNumBooksChange = (event) => setNumBooks(parseInt(event.target.value));
  
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("numBooks", numBooks);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:3001/books", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTitle("");
      setAuthor("");
      setCategory("");
      setDescription("");
      setPrice(0);
      setNumBooks(0);
      setImage(null);
      setError("");
      alert("Book added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error occurred while adding the book.");
    }
  };

  return (
<div className="my-registration1">
  <div className="registration1">
    <h1>Add Book</h1>

    <form onSubmit={handleSubmit}>
      <label>
        Image:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <label>
        Category:
        <select value={category} onChange={handleCategoryChange}>
          <option value="">-- Select a category --</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="romance">Romance</option>
          <option value="mystery">Mystery</option>
          <option value="sciencef">Science Fiction</option>
          <option value="biography">Biography</option>
          <option value="history">History</option>
          <option value="self-help">Self-help</option>
          <option value="cookbooks">Cookbooks</option>
          <option value="travel">Travel</option>
          <option value="art">Art/Photography</option>
          <option value="children">Children's Books</option>
          <option value="education">Education</option>
          <option value="science">Science/Technology</option>
          <option value="humor">Humor</option>

        </select>
      </label>
      <label>
        Author:
        <input type="text" value={author} onChange={handleAuthorChange} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={handleDescriptionChange} />
      </label>
      <label>
        Price:
        <input type="number" min="0" step="0.01" value={price.toString()} onChange={handlePriceChange} />
      </label>
      <label>
        Number of books available:
        <input type="number" min="0" value={numBooks.toString()} onChange={handleNumBooksChange} />
      </label>
      <button type="submit">Add Book</button>
      {error && <p className="error">{error}</p>}
    </form>
  </div>
</div>

  );
};

export default BookForm;
