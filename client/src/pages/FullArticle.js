import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FacebookShareButton, FacebookIcon, WhatsappShareButton , WhatsappIcon,TwitterShareButton, TwitterIcon } from "react-share";
import "../components/style/fullarticle.css";

function FullArticle() {
  const [article, setArticle] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/news/${id}`)
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const renderContent = () => {
    const regexBold = /\*([^*]+)\*/g;
    const regexTitle = /#([^#]+)#/g;
    const regexNewline = /(?:\r\n|\r|\n)/g;
    const paragraphs = article.content
      .replace(regexBold, "<strong>$1</strong>")
      .replace(regexTitle, "<h2>$1</h2>")
      .split(regexNewline);
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="article-content" dangerouslySetInnerHTML={{ __html: paragraph }} />
    ));
  };
  
  
  
  
  return (
    <div className="full-article-container">
      <div className="article-header">
        <h1 className="article-title">{article.title}</h1>
      </div>

      {article.image_filename && (
        <div className="article-image-container">
          <img
            className="article-image"
            src={`http://localhost:3001/uploads/${article.image_filename}`}
            alt={article.title}
          />
        </div>
      )}

      {article.content && renderContent()}

      <hr />

      <div className="article-share-buttons">
        <FacebookShareButton
          url={`http://localhost:3001/news/${id}`}
          title={article.title}
          hashtag="#muo"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={`http://localhost:3001/news/${id}`}
          title={article.title}
          hashtag="#muo"
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <WhatsappShareButton
          url={`http://localhost:3001/news/${id}`}
          title={article.title}
          hashtag="#muo"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
}

export default FullArticle;

