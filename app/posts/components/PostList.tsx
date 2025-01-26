"use client";

export default function PostList({
  posts = [], 
  fetchPosts,
}: {
  posts: any[];
  fetchPosts: () => void;
}) {
  const handleDelete = async (id: string) => {
    await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
    fetchPosts();
  };

  return (
    <ul>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post: any) => (
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
        ))
      ) : (
        <p className="text-gray-500">No posts available.</p> 
      )}
    </ul>
  );
}
