"use client";

import { useEffect, useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]); // Berikan default sebagai array kosong

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data.data || []); // Pastikan data adalah array atau default kosong
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setPosts([]); // Set posts ke array kosong jika terjadi error
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Posts</h1>
      <PostForm fetchPosts={fetchPosts} />
      <PostList posts={posts} fetchPosts={fetchPosts} />
    </main>
  );
}
