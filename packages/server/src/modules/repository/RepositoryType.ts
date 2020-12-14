import { GraphQLObjectType, GraphQLString, GraphQLObjectTypeConfig, GraphQLNonNull, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { NodeInterface } from '../../interface/NodeInterface';
import { connectionDefinitions } from '../../connection/CustomConnectionType';

import { GraphQLContext } from '../../TypeDefinition';

import User from './RepositoryLoader';
import { UserLoader } from '../../loader';

type ConfigType = GraphQLObjectTypeConfig<User, GraphQLContext>;

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
    endCursor: {
      type: GraphQLString,
      resolve: user => user.endCursor,
    },
    totalCount: {
      type: GraphQLInt,
      resolve: user => user.totalCount,
    },
    users: {
      type: UserConnection.connectionType,
      resolve: async (obj, args, context) => await UserLoader.loadUsers(context, args),
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
