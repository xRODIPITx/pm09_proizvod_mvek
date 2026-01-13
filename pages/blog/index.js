import { useState, useEffect } from "react";
import Link from "next/link";

const Blog = ({ token, setModalBox, setMessage }) => {
  const [posts, setPosts] = useState([]);
  console.log("setModalBox:", setModalBox);

  useEffect(() => {
    // Запрашиваем все статьи для страницы блога
    const fetchPosts = async () => {
      const res = await fetch("/api/blog"); // Без параметра page
      const data = await res.json();
      setPosts(data.data);
    };

    fetchPosts();
  }, []);

  function AddBlogPost() {
    if (token !== null) {
      return (
        <>
          <button
            className="addButton"
            onClick={() => setModalBox("BlogPostAdd")}
          >
            Добавить блог
          </button>
        </>
      );
    }
  }

  return (
    <div className="blog-section">
      <div className="section-title">
        <h1>Блог</h1>
      </div>
      <AddBlogPost
        token={token}
        setModalBox={setModalBox}
        setMessage={setMessage}
      />
      <div className="blog-posts">
        {posts.map((post) => (
          <div key={post._id} className="blog-post">
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 150)}...</p>
            <Link href={`/blog/${post._id}`} className="read-more">
              Читать дальше
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
