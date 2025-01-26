"use client";

import { useState } from "react";
// import { useAuth } from "@clerk/nextjs";

export default function PostForm({ fetchPosts }: { fetchPosts: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const { userId } = useAuth();

  const handleCreate = async () => {
    // if (!userId) {
    //   console.error("User is not authenticated.");
    //   return;
    // }

    // console.log("Sending user ID:", userId); 

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
      // body: JSON.stringify({ title, content, user: '12' }),
    });
    setTitle("");
    setContent("");
    fetchPosts();
  };

  return (
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
  );
}
