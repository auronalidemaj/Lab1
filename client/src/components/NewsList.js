import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style/newsList.css";

function DashboardNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/news").then((res) => {
      setNews(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/news/${id}`)
      .then((res) => {
        setNews(news.filter((article) => article.id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="newsList">
      <div className="headers">
      <h1>News</h1>
      <Link to="/create-news">
      <button className="create">Add a new article</button>
    </Link>
    </div>
      <div className="paragraph-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Newswriter</th>
              <th>Content</th>
              <th>Published At</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.author}</td>
                <td>
                  <div className="scrollable-content">{article.content}</div>
                </td>
                <td>{article.published_at}</td>
                <td>
                  <img
                    src={`http://localhost:3001/uploads/${article.image_filename}`}
                    alt={article.title}
                  />
                </td>
                <td>
                  <button className="edit-button">
                    <Link to={`/news/${article.id}/edit`}>Edit</Link>
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(article.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardNews;




