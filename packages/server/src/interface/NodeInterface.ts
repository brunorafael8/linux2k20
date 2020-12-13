import { nodeDefinitions } from 'graphql-relay';

import { GraphQLContext } from '../TypeDefinition';

const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
  async (globalId, context: GraphQLContext) => {
    return null;
  },
  obj => {
    return null;
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
export const NodesField = nodesField;
