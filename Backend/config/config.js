
// module.exports = {
//     database: {
//       url: 'http://vakcouch:couvakch@localhost:5984',
//       dbName: 'new_headcount',
//     },
//     rateLimit: {
//       windowMs: 1 * 60 * 1000, // 1 minute
//       max:1, // limit each IP to 2 requests per windowMs
//       message: "Number of requests exceeded, try again later",
//     },
//     server: {
//       port: 5000,
//     },
//   };
  

const nano = require('nano')(process.env.DATABASE_URL);

const db = nano.use(process.env.DATABASE_NAME);

module.exports = db;
