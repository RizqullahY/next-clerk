import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Request received");

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
      // console.log("Received user ID:", user);

      // // Tidak perlu memvalidasi ObjectId lagi karena sekarang user berupa string
      // if (!user) {
      //   return res.status(400).json({ error: "User ID is required." });
      // }

      const newPost = new Post({
        title,
        content,
      });

      const savedPost = await newPost.save();
      res.status(201).json({ data: savedPost });
    } catch (error) {
      console.error(error);  // Log error untuk debugging
      res.status(500).json({ error: error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
