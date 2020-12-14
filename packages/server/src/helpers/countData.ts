const countValuePerUser = counts => {
  const usersWithCount = {};

  Object.keys(counts).forEach(user => {
    const count = counts[user];
    usersWithCount[user] = count.reduce((a, b) => a + b, 0);
  });

  return usersWithCount;
};

export const countAdditions = commits => {
  const counts = commits.reduce((acc, cur) => {
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

  return countValuePerUser(counts);
};

export const countDeletions = commits => {
  const counts = commits.reduce((acc, cur) => {
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

  return countValuePerUser(counts);
};

export const countCommit = commits => {
  return commits.reduce((acc, cur) => {
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
};
