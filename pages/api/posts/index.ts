import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const posts = await Post.find({}).sort({ date: -1 }); // Ambil semua postingan, urutkan dari terbaru
      res.status(200).json({ data: posts });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts." });
    }
  } else if (req.method === "POST") {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required." });
      }

      const newPost = new Post({
        title,
        content,
      });

      const savedPost = await newPost.save();
      res.status(201).json({ data: savedPost });
    } catch (error) {
      res.status(500).json({ error: "Failed to create post." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
