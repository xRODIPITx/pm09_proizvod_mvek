import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!id) return; // ждём пока id появится

    fetch(`/api/blog?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data);
        setPost(data.data);
      });
  }, [id]);

  if (!id || !post) return <p>Загрузка...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
