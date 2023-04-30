import React, { useState, useEffect } from "react";
import axios from "axios";
import '../components/style/news.css';

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/news")
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const day = date.toLocaleString('en-US', { day: 'numeric' });
    let suffix = '';
    if (day === '1' || day === '21' || day === '31') {
      suffix = 'st';
    } else if (day === '2' || day === '22') {
      suffix = 'nd';
    } else if (day === '3' || day === '23') {
      suffix = 'rd';
    } else {
      suffix = 'th';
    }
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).replace(day, `${day}${suffix}`);
  };

  return (
    <div className="news-container">
      {news.map((newsItem) => (
        <div key={newsItem.id} className="news-item">
          {newsItem.image_filename && (
            <img
              src={`http://localhost:3001/uploads/${newsItem.image_filename}`}
              alt={newsItem.title}
            />
          )}
          <div className="news-item-content">
            <h2>{newsItem.title}</h2>
            <p className="content">{newsItem.content}</p>
            <time className="date">{formatDate(newsItem.published_at)}</time>
          </div>
        </div>
      ))}
    </div>
  );
}

export default News;


