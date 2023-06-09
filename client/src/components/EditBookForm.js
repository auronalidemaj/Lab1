import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./style/bookform.css";

const EditBookForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [numBooks, setNumBooks] = useState(0);
  const [image, setImage] = useState("");
  const [existingImage, setExistingImage] = useState("");
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

  useEffect(() => {
    axios.get(`http://localhost:3001/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setCategory(response.data.category);
        setAuthor(response.data.author);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setNumBooks(response.data.numBooks);
        setExistingImage(response.data.image);
      })
      .catch((error) => {
        console.error(error);
        setError("Error occurred while fetching the book details.");
      });
  }, [id]);

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
    }else {
      formData.append("existingImage", existingImage);
    }

    try {
      await axios.put(`http://localhost:3001/books/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });  
      setError("");
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError("Error occurred while updating the book.");
    }
  };

  return (
    <div className="my-registration1">

      <div className="registration1">
      <h1>Edit Book:</h1>
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
          <option value="Art/Photograpy">Art/Photography</option>
          <option value="Children's Books">Children's Books</option>
          <option value="Education">Education</option>
          <option value="Science/Technology">Science/Technology</option>
          <option value="Humor">Humor</option>
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
          {error && <p className="error">{error}</p>}
          <button type="submit">Update Book</button>
        </form>
      </div>
    </div>
  );
};
export default EditBookForm;
             
