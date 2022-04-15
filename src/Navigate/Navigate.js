import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Navigate.module.css";
function Navigate() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const getPosts = (limit) => {
    axios.get(`https://picsum.photos/v2/list?page=${limit}&limit=100`).then((res) => {
      setPosts([...posts, ...res.data]);
    })
    .then(()=> {
        setLoading(false);
    })
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight
    ) {
        console.log("scrolled to bottom")
      setPage(prevPage => prevPage + 1);
      setLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    getPosts(1);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!loading) return;
    else getPosts(page);
  }, [loading]);

  return (
    <div className={classes.parentContainer}>
      {posts.map((post) => (
        <div>
          <img src={post.download_url} alt="" style={{height:"100%", width:"100%"}}/>
        </div>
      ))}
    </div>
  );
}

export default Navigate;
