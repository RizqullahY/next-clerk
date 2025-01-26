import mongoose, { Model, Schema } from "mongoose";

interface IComment {
  user: mongoose.Schema.Types.ObjectId;
  content: string;
  date: Date;
  reply: IReply[];
}

interface IReply {
  user: mongoose.Schema.Types.ObjectId;
  content: string;
  date: Date;
}

interface IPost extends Document {
  user: mongoose.Schema.Types.ObjectId;
  content: string;
  image: string[];
  video: string | null;
  likes: mongoose.Schema.Types.ObjectId[];
  commentar: IComment[];
  date: Date;
}

const ReplySchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const CommentSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reply: [ReplySchema],
});

const PostSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  image: { type: [String], default: [] },
  video: { type: String, default: null },
  likes: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
  commentar: [CommentSchema],
  date: { type: Date, default: Date.now },
});

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
export type { IPost, IComment, IReply };

