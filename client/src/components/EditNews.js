import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import "./style/createEditNews.css";

function UpdateNews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/news/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setContent(res.data.content);
        setExistingImage(res.data.image);
      })
      .catch((err) => setErrorMsg(err.response.data));
  }, [id]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("existingImage", existingImage);
    }

    try {
      await axios.put(`http://localhost:3001/news/${id}`, formData);
      setSuccessMsg("News updated successfully");
      setErrorMsg("");
      navigate('/newsList');
    } catch (err) {
      setSuccessMsg("");
      setErrorMsg(err.response.data);
    }
  };

  return (
    <div className="create-news-container">
      <h1>Update News</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="author">Newswriter:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <label htmlFor="image">Image: </label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        <button type="submit">Update News</button>
      </form>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
    </div>
  );
}

export default UpdateNews;




