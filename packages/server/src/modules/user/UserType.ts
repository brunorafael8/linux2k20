import { GraphQLObjectType, GraphQLString, GraphQLObjectTypeConfig, GraphQLNonNull, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { NodeInterface } from '../../interface/NodeInterface';
import { connectionDefinitions } from '../../connection/CustomConnectionType';

import { GraphQLContext } from '../../TypeDefinition';


import User from './UserLoader';

type ConfigType = GraphQLObjectTypeConfig<User, GraphQLContext>;

const CommitType = new GraphQLObjectType({
  name: 'sizes',
  fields: () => ({
    committedDate: {
      type: GraphQLString,
      resolve: obj => obj.committedDate,
    },
    additions: {
      type: GraphQLInt,
      resolve: obj => obj.committedDate,
    },
    deletions: {
      type: GraphQLInt,
      resolve: obj => obj.committedDate,
    },
  }),
});

const UserTypeConfig: ConfigType = {
  name: 'User',
  description: 'Represents User',
  fields: () => ({
    id: globalIdField('User'),
    _id: {
      type: GraphQLString,
      description: 'MongoDB _id',
      resolve: user => user._id.toString(),
    },
    login: {
      type: GraphQLString,
      resolve: user => user.login,
    },
    commit: {
      type: CommitType,
      resolve: user => user.commit,
    },
  }),
  interfaces: () => [NodeInterface],
};

const UserType = new GraphQLObjectType(UserTypeConfig);

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: GraphQLNonNull(UserType),
});

export default UserType;
