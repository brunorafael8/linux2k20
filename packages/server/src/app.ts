import Koa, { Request } from 'koa';
import cors from 'kcors';
import Router from '@koa/router';
import graphqlHTTP from 'koa-graphql';
import bodyParser from 'koa-bodyparser';
import graphqlBatchHttpWrapper from 'koa-graphql-batch';
import logger from 'koa-logger';
import koaPlayground from 'graphql-playground-middleware-koa';
import { GraphQLError } from 'graphql';

import { schema } from './schema';
import * as loaders from './loader';

const app = new Koa();
const router = new Router();

const graphqlSettingsPerReq = async (req: Request) => {
  const dataloaders = Object.keys(loaders).reduce(
    (acc, loaderKey) => ({
      ...acc,
      [loaderKey]: loaders[loaderKey].getLoader(),
    }),
    {},
  );

  return {
    graphiql: process.env.NODE_ENV !== 'production',
    schema,
    context: {
      req,
      dataloaders,
    },
    // extensions: ({ document, variables, operationName, result }) => {
    // console.log(print(document));
    // console.log(variables);
    // console.log(result);
    // },
    formatError: (error: GraphQLError) => {
      console.log(error.message);
      console.log(error.locations);
      console.log(error.stack);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  };
};

const graphqlServer = graphqlHTTP(graphqlSettingsPerReq);

router.all('/graphql/batch', bodyParser(), graphqlBatchHttpWrapper(graphqlServer));
router.all('/graphql', graphqlServer);
router.all(
  '/playground',
  koaPlayground({
    endpoint: '/graphql',
    subscriptionEndpoint: '/subscriptions',
  }),
);

app.use(logger());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

export default app;
