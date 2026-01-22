import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/blog?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data);
        setPost(data.data);
      });
  }, [id]);

  async function deleteBlogPost(id) {
    if (!confirm("Удалить запись в блоге?")) return;

    const res = await fetch(`/api/blog/delete?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    router.push("/blog");
  }

  if (!id || !post) return <p>Загрузка...</p>;

  return (
    <div className="blog-page">
      <div className="blog-title">
        <h1>{post.title}</h1>
        <h4>{post.createdAt.substring(0, 16)}</h4>
      </div>
      <h4 className="blog-content">{post.content}</h4>
      <button className="danger" onClick={() => deleteBlogPost(post._id)}>
        Удалить
      </button>
    </div>
  );
}
