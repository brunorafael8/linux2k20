import mongoose, { Document, Model } from 'mongoose';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    commitsCount: {
      type: Number,
      required: true,
    },
    additions: {
      type: Number,
      required: true,
    },
    deletions: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export interface IUser extends Document {
  name: string;
  commitsCount: number;
  additions: number;
  deletions: number;
}

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model('User', Schema);

export default UserModel;
