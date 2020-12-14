import graphql from 'graphql.js';
import RepositoryModel from '../modules/repository/RepositoryModel';
import UserModel from '../modules/user/UserModel';

import dotenv from 'dotenv';
dotenv.config();

var graph = graphql('https://api.github.com/graphql', {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    'User-Agent': 'linux2k20',
  },
  asJSON: true,
});

const getRepo = async () => {
  let commits = [];
  let repoName;
  let repository = await RepositoryModel.find({ name: 'linux' });

  let endCursor = repository[0]?.endCursor;
  let totalCount = repository[0]?.totalCount;
  let itemsDownloaded = repository[0]?.itemsDownloaded;

  let hasNextPage = false;
  if (totalCount === itemsDownloaded) {
    if (await ChekingNewData(totalCount)) return;
  }

  do {
    await graph(`
      query repo($name: String!, $owner: String!){
          repository(name:$name, owner:$owner){
            name
            object(expression: "master") {
              ... on Commit {
                oid
                history(first: 100 ${endCursor ? `,after: "${endCursor}",` : ','} since: "2020-12-01T00:00:00Z" ) {
                  pageInfo{
                    hasNextPage
                    startCursor
                    endCursor
                  }
                  totalCount
                  nodes {
                    oid
                    author {
                      user {
                        login
                      }
                    }
                    additions
                    deletions
                  }
                }
              }
            }      
          }
      }
  `)({
      name: 'linux',
      owner: 'torvalds',
    })
      .then(function(response) {
        const { repository } = response;
        const { object, name } = repository;
        const { history } = object;
        commits = commits.concat(history.nodes);
        hasNextPage = history.pageInfo.hasNextPage;
        endCursor = history.pageInfo.endCursor;
        repoName = name;
        totalCount = history.totalCount;
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(commits.length);

    await RepositoryModel.findOneAndUpdate(
      { name: repoName },
      { endCursor, totalCount, itemsDownloaded: commits.length },
      { upsert: true, new: true },
    );
  } while (hasNextPage);
  return standardCompetitionScoring(commits);
};

async function ChekingNewData(totalCount) {
  let NewTotalCount;
  console.log('asuashu');
  await graph(`
  query repo($name: String!, $owner: String!){
      repository(name:$name, owner:$owner){
        name
        object(expression: "master") {
          ... on Commit {
            oid
            history(since: "2020-12-01T00:00:00Z") {
              totalCount
            }
          }
        }
      }
  }
`)({
    name: 'linux',
    owner: 'torvalds',
  })
    .then(function(response) {
      const { repository } = response;
      const { object } = repository;
      const { history } = object;
      console.log(history.totalCount, 'asah');
      console.log(totalCount, 'asah');
      NewTotalCount = history.totalCount;
    })
    .catch(function(error) {
      console.log(error);
    });

  return NewTotalCount === totalCount;
}

function standardCompetitionScoring(commits) {
  // Count the number of commits by each user
  UserModel.remove({});
  const countsCommit = commits.reduce((acc, cur) => {
    const user = cur.author?.user?.login;
    if (acc[user]) {
      if (acc[user].indexOf(cur.oid) === -1) {
        acc[user].push(cur.oid);
      }
    } else {
      acc[user] = [cur.oid];
    }
    return acc;
  }, {});

  const usersWithCountCommit = {};
  Object.keys(countsCommit).forEach(user => {
    const count = countsCommit[user].length;
    usersWithCountCommit[count] = usersWithCountCommit[count] + 1 || 1;
  });

  const countAdditions = commits.reduce((acc, cur) => {
    const user = cur.author?.user?.login;
    if (acc[user]) {
      if (acc[user].indexOf(cur.oid) === -1) {
        acc[user].push(cur.additions);
      }
    } else {
      acc[user] = [cur.additions];
    }
    return acc;
  }, {});

  const usersWithCountAddition = {};

  Object.keys(countAdditions).forEach(user => {
    const count = countAdditions[user];
    usersWithCountAddition[user] = count.reduce((a, b) => a + b, 0);
  });

  const countDeletions = commits.reduce((acc, cur) => {
    const user = cur.author?.user?.login;
    if (acc[user]) {
      if (acc[user].indexOf(cur.oid) === -1) {
        acc[user].push(cur.deletions);
      }
    } else {
      acc[user] = [cur.deletions];
    }
    return acc;
  }, {});

  const usersWithCountDeletions = {};

  Object.keys(countDeletions).forEach(user => {
    const count = countDeletions[user];
    usersWithCountDeletions[user] = count.reduce((a, b) => a + b, 0);
  });

  const sortedUsers = Object.keys(countsCommit).sort((a, b) => countsCommit[b].length - countsCommit[a].length);
  return sortedUsers.map(name => {
    const n = countsCommit[name].length;
    const additions = usersWithCountAddition[name];
    const deletions = usersWithCountDeletions[name];
    console.log('foi');
    return UserModel.create({
      name,
      commitsCount: n,
      additions,
      deletions,
    });
  });
}

export default getRepo;
