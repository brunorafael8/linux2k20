  import { GraphQLObjectType, GraphQLString, GraphQLObjectTypeConfig, GraphQLNonNull, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { NodeInterface } from '../../interface/NodeInterface';
import { connectionDefinitions } from '../../connection/CustomConnectionType';

import { GraphQLContext } from '../../TypeDefinition';

import User from './UserLoader';

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
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    commitsCount: {
      type: GraphQLInt,
      resolve: user => user.commitsCount,
    },
    additions: {
      type: GraphQLInt,
      resolve: user => user.additions,
    },
    deletions: {
      type: GraphQLInt,
      resolve: user => user.deletions,
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
