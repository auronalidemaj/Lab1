import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../components/style/news.css";

function News() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

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


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);

 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="news-container">
        {currentItems.map((newsItem) => (
          <div key={newsItem.id} className="news-item">
            {newsItem.image_filename && (
              <div className="news-image-container">
                <img
                  src={`http://localhost:3001/uploads/${newsItem.image_filename}`}
                  alt={newsItem.title}
                />
              </div>
            )}
            <div className="news-item-content">
              <h2>{newsItem.title}</h2>
              <p className="content">{newsItem.content.slice(0, 200) + "..."}</p>
              <Link to={`/news/${newsItem.id}`}>Read More</Link>
              <hr></hr>
              <time className="date">{formatDate(newsItem.published_at)}</time>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {news.length > itemsPerPage && (
          <ul>
            {Array.from({ length: Math.ceil(news.length / itemsPerPage) }).map(
              (item, index) => (
                <li
                  key={index}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default News;
