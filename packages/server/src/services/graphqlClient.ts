import graphql from 'graphql.js';

export const graph = graphql('https://api.github.com/graphql', {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    'User-Agent': 'linux2k20',
  },
  asJSON: true,
});
