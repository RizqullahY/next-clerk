"use client";

import { useState, useEffect } from "react";
interface Post {
  _id: string;
  title: string;
  content: string;
}
export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const response = await fetch("/api/posts");
    const data = await response.json();
    setPosts(data.data);
  };

  const handleCreate = async () => {
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Posts</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Create
          </button>
        </div>
        <ul>
          {posts.map((post: Post) => (
            <li key={post._id} className="mb-2 border-b pb-2">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p>{post.content}</p>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
