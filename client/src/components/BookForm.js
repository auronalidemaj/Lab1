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
  const [successMessage,setSuccessMessage] = useState("");
  
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
  
    if (title === "") {
      setError("Title is required");
      return;
    }
  
    if (category === "") {
      setError("Category is required");
      return;
    }
  
    if (author === "") {
      setError("Author is required");
      return;
    }
  
    if (description === "") {
      setError("Description is required");
      return;
    }
  
    if (price <= 0) {
      setError("Price should be greater than 0");
      return;
    }
  
    if (numBooks <= 0) {
      setError("Number of books should be greater than 0");
      return;
    }
  
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
      setSuccessMessage("Book added successfully!");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError("Error occurred while adding the book.");
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
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-Fiction</option>
          <option value="Romance">Romance</option>
          <option value="Mystery">Mystery</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Biography">Biography</option>
          <option value="History">History</option>
          <option value="Self-help">Self-help</option>
          <option value="Cookbooks">Cookbooks</option>
          <option value="Travel">Travel</option>
          <option value="Art/Photography">Art/Photography</option>
          <option value="Children's Books">Children's Books</option>
          <option value="Education">Education</option>
          <option value="Science/Technology">Science/Technology</option>
          <option value="Humor">Humor</option>

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
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <button type="submit">Add Book</button>
    </form>
  </div>
</div>

  );
};

export default BookForm;
