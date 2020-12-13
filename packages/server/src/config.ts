import dotenv from 'dotenv';
dotenv.config();

// Database Settings
const dBdevelopment = process.env.MONGO_URL || 'mongodb://localhost/database';
const dBproduction = process.env.MONGO_URL || 'mongodb://localhost/database';

// Export DB Settings
export const databaseConfig = process.env.NODE_ENV === 'production' ? dBproduction : dBdevelopment;

// Export GraphQL Server settings
export const graphqlPort = process.env.GRAPHQL_PORT || 5000;
