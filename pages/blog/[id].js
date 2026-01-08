import { useEffect, useState } from "react";

const PostPage = ({ query }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/blog/${query.id}`);
      const data = await res.json();
      setPost(data);
    };

    fetchPost();
  }, [query.id]);

  if (!post) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </div>
  );
};

export default PostPage;
