export function standardCompetitionScoring(commits) {
    // Count the number of commits by each user
    const counts = commits.reduce((acc, cur) => {
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
  
    console.log(counts);
  
    // Count the number of users with a given score
    const usersWithCount = {};
    Object.keys(counts).forEach(user => {
      const count = counts[user].length;
      usersWithCount[count] = usersWithCount[count] + 1 || 1;
    });
  
    // // Create a rank for each score
    // const sortedCounts = Object.keys(usersWithCount).sort((a, b) => b - a);
  
    // const ranks = {};
    // let start = 1;
    // sortedCounts.forEach(c => {
    //   ranks[c] = {
    //     start,
    //     count: usersWithCount[c],
    //   };
    //   start += usersWithCount[c];
    // });
  
    // Return the formatted data
    const sortedUsers = Object.keys(counts).sort((a, b) => counts[b].length - counts[a].length);
    return sortedUsers.map(login => {
      console.log(login, 'auhshuas');
      const n = counts[login].length;
      return {
        login,
        commits: n,
      };
    });
  }