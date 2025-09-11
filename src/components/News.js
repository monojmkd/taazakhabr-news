import React, { useEffect, useState, useCallback } from "react";
import NewsItem from "./NewsItem";
import propTypes from "prop-types";
import Spinner from "./Spinner";
import "../css/News.css";

const News = ({ category, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = useCallback(async () => {
    try {
      setProgress(10);
      const BASE_URL = process.env.REACT_APP_BACKEND_RENDER_URL;
      const url = `${BASE_URL}/api/news/${category}`;

      setLoading(true);
      let data = await fetch(url);
      setProgress(30);

      let parsedData = await data.json();
      setProgress(70);

      const newsData = (parsedData.data.news || []).map((item) => ({
        id: item.hash_id,
        title: item.news_obj.title,
        content: item.news_obj.content,
        author: item.news_obj.author_name,
        date: new Date(item.news_obj.created_at).toDateString(),
        imageUrl: item.news_obj.image_url,
        readMoreUrl: item.news_obj.source_url,
      }));

      setArticles(newsData);

      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
      setProgress(100);
    }
  }, [category, setProgress]);

  useEffect(() => {
    document.title = `TaazaKhabr - ${capitalizeFirstLetter(category)}`;
    updateNews();
  }, [category, updateNews]);

  return (
    <div className="container">
      <h2>Fresh News at Your Fingertips: {capitalizeFirstLetter(category)}</h2>
      {loading && <Spinner />}
      {articles.map((element, index) => (
        <div className="news" key={index}>
          <NewsItem
            title={element.title ? element.title.slice(0, 100) : ""}
            description={element.content ? element.content.slice(0, 180) : ""}
            imageUrl={element.imageUrl}
            newsURL={element.readMoreUrl}
            author={element.author}
            date={element.date}
          />
        </div>
      ))}
    </div>
  );
};

News.defaultProps = {
  category: "all",
};

News.propTypes = {
  category: propTypes.string,
  setProgress: propTypes.func.isRequired,
};

export default News;
