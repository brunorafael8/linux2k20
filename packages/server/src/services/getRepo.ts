import dotenv from 'dotenv';

import { countCommit, countAdditions, countDeletions } from './../helpers/countData';
import RepositoryModel from '../modules/repository/RepositoryModel';
import UserModel from '../modules/user/UserModel';

import { graph } from './graphqlClient';

dotenv.config();

export const getRepo = async () => {
  let commits = [];
  let repoName = '';
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

    await RepositoryModel.findOneAndUpdate(
      { name: repoName },
      { endCursor, totalCount, itemsDownloaded: commits.length },
      { upsert: true, new: true },
    );
  } while (hasNextPage);
  return standardCompetitionScoring(commits);
};

const ChekingNewData = async totalCount => {
  let NewTotalCount = 0;
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
      NewTotalCount = history.totalCount;
    })
    .catch(function(error) {
      console.log(error);
    });

  return NewTotalCount === totalCount;
};

const standardCompetitionScoring = commits => {
  const countedCommitsPerUser = countCommit(commits);
  const usersWithCountAddition = countAdditions(commits);
  const usersWithCountDeletions = countDeletions(commits);

  const sortedUsers = Object.keys(countedCommitsPerUser).sort(
    (a, b) => countedCommitsPerUser[b].length - countedCommitsPerUser[a].length,
  );
  return sortedUsers.map(name => {
    const n = countedCommitsPerUser[name].length;
    const additions = usersWithCountAddition[name];
    const deletions = usersWithCountDeletions[name];
    return UserModel.create({
      name,
      commitsCount: n,
      additions,
      deletions,
    });
  });
};
