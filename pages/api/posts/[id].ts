import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing post ID.' });
  }

  if (req.method === 'DELETE') {
    try {
      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
      }

      await Post.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete post.' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { content, image, video } = req.body;

      if (!content && !image && !video) {
        return res.status(400).json({ error: 'No update fields provided.' });
      }

      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { content, image, video },
        { new: true, runValidators: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found.' });
      }

      return res.status(200).json(updatedPost);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update post.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
}