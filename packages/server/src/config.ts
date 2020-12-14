import dotenv from 'dotenv';
dotenv.config();

// Database Settings
const dBdevelopment = process.env.MONGO_URL || 'mongodb://localhost/linux2k20';
const dBproduction = process.env.MONGO_URL || 'mongodb://localhost/linux2k20  ';

// Export DB Settings
export const databaseConfig = process.env.NODE_ENV === 'production' ? dBproduction : dBdevelopment;

// Export GraphQL Server settings
export const graphqlPort = process.env.GRAPHQL_PORT || 5000;

export const project = {
  // server
  GRAPHQL_SCHEMA_FILE: process.env.GRAPHQL_SCHEMA_FILE || './schemas/graphql/schema.graphql',

  // web, app
  GRAPHQL: process.env.GRAPHQL || 'graphql',
};
