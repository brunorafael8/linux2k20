import mongoose, { Document, Model } from 'mongoose';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    endCursor: {
      type: String,
      required: true,
    },
    totalCount: {
      type: Number,
      required: true,
    },
    itemsDownloaded: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export interface IRepository extends Document {
  endCursor: string;
  totalCount: number;
  itemsDownloaded: number;
}

const RepositoryModel: Model<IRepository> = mongoose.models.Repository || mongoose.model('Repository', Schema);

export default RepositoryModel;
