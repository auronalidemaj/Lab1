import React, { useState } from "react";
import axios from "axios";
import "./style/createEditNews.css";
import { useNavigate } from "react-router-dom";

function CreateNews() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
  
    try {
      await axios.post("http://localhost:3001/news", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTitle("");
      setAuthor("");
      setContent("");
      if (!image) {
        setImage(null);
      }
      navigate("/newslist");
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div className="create-news-container">
      <h1>Create News</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
        Newswriter:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </label>
        <br />
        <label>
          Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <br />
        <button type="submit">Create News</button>
      </form>
    </div>
  );
}

export default CreateNews;
