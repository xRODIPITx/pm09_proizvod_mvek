import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

export default function BlogPost({ token, setModalBox, setMessage }) {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/blog?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("DATA:", data);
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

  if (!id || !post) return <p className="loading">Загрузка...</p>;

  function IsAdmin({ token }) {
    if (token && token !== "undefined") {
      const decoded = jwtDecode(token);
      const role = decoded.role;

      return (
        <>
          {role === "admin" ? (
            <button className="danger" onClick={() => deleteBlogPost(post._id)}>
              Удалить
            </button>
          ) : (
            <></>
          )}
        </>
      );
    }
  }

  return (
    <div className="blog-page">
      <div className="blog-title">
        <h1>{post.title}</h1>
        <h4>{post.createdAt.substring(0, 16)}</h4>
      </div>
      <h4 className="blog-content">{post.content}</h4>

      <IsAdmin
        token={token}
        setModalBox={setModalBox}
        setMessage={setMessage}
      />
    </div>
  );
}
