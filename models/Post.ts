import mongoose, { Model, Schema, Document } from "mongoose";

interface IReply {
  // user: string;
  content: string;
  date: Date;
}

interface IComment {
  // user: string;
  content: string;
  date: Date;
  reply: IReply[];
}

interface IPost extends Document {
  // user: string;  // Mengubah dari ObjectId ke string
  content: string;
  image: string[];
  video: string | null;
  likes: string[];
  commentar: IComment[];
  date: Date;
}

const ReplySchema: Schema = new Schema({
  // user: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const CommentSchema: Schema = new Schema({
  // user: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reply: [ReplySchema],
});

const PostSchema: Schema = new Schema({
  // user: { type: String, required: true },  // Mengubah ObjectId ke String
  content: { type: String, required: true },
  image: { type: [String], default: [] },
  video: { type: String, default: null },
  likes: { type: [String], default: [] },
  commentar: [CommentSchema],
  date: { type: Date, default: Date.now },
});

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
export type { IPost, IComment, IReply };
