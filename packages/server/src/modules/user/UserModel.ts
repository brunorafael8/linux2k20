import mongoose, { Document, Model } from 'mongoose';

const CommitSchema = new mongoose.Schema(
  {
    committedDate: {
      type: String,
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
  { autoIndex: false },
);

const Schema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
    },
    commit: {
      type: CommitSchema,
      required: true,
    },
  },
  { timestamps: true },
);

export interface IUser extends Document {
  login: string;
  commit: {
    committedDate: string;
    additions: number;
    deletions: number;
  };
}

const UserModel: Model<IUser> = mongoose.model('User', Schema);

export default UserModel;
