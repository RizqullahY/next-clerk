import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@/models/Post";
import connectToDatabase from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case "POST":
      try {
        const post = await Post.create(req.body);
        res.status(201).json({ success: true, data: post });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "PUT":
      try {
        const { id } = req.query;
        const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
        if (!post)
          return res
            .status(404)
            .json({ success: false, error: "Post not found" });
        res.status(200).json({ success: true, data: post });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost)
          return res
            .status(404)
            .json({ success: false, error: "Post not found" });
        res.status(200).json({ success: true, data: deletedPost });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
