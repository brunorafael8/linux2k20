import { GraphQLEnumType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';

import { NodeField } from '../interface/NodeInterface';
import { UserLoader } from '../loader';
import { UserConnection } from '../modules/user/UserType';

const RankTypeEnumType = new GraphQLEnumType({
  name: 'RankType',
  values: {
    COMMITS: {
      value: 'commits',
    },
    ADDITIONS: {
      value: 'additions',
    },
    DELETION: {
      value: 'deletions',
    },
  },
});

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: NodeField,
    users: {
      type: UserConnection.connectionType,
      args: {
        ...connectionArgs,
        rankType: {
          type: GraphQLNonNull(RankTypeEnumType),
        },
      },
      resolve: (obj, args, context) => UserLoader.loadUsers(context, args),
    },
  }),
});
