import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';

import UserModel from './UserModel';

export default class User {
  _id: string;
  id: string;
  name: string;
  additions: number;
  commitsCount: number;
  deletions: number;

  constructor(data) {
    this.id = data.id || data._id;
    this._id = data._id;
    this.name = data.name;
    this.commitsCount = data.commitsCount;
    this.additions = data.additions;
    this.deletions = data.deletions;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(UserModel, ids));

const viewerCanSee = () => true;

export const load = async (context, id) => {
  if (!id) return null;

  try {
    const data = await context.dataloaders.UserLoader.load(id);

    if (!data) {
      return null;
    }

    return viewerCanSee() ? new User(data) : null;
  } catch (err) {
    return null;
  }
};

export const loadUsers = async (context, args) => {
  const getSort = () => ({
    commits: { commitsCount: -1 },
    additions: { additions: -1 },
    deletions: { deletions: -1 },
    '': { commitsCount: -1 },
  });

  const users = UserModel.find({}, { _id: 1 }).sort(getSort()[args.rankType]);

  return connectionFromMongoCursor({
    cursor: users,
    context,
    args,
    loader: load,
  });
};
