const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
  query: async (text, params) => {
    return await pool.query(text, params);
  },
  getClient: callback => {
    pool.connect((err, client, done) => {
      const query = client.query;
      // monkey patch the query method to keep track of the last query executed
      client.query = (...args) => {
        client.lastQuery = args;
        return query.apply(client, args);
      };
      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!');
        console.error(
          `The last executed query on this client was: ${client.lastQuery}`
        );
      }, 5000);
      const release = err => {
        // call the actual 'done' method, returning this client to the pool
        done(err);
        // clear our timeout
        clearTimeout(timeout);
        // set the query method back to its old un-monkey-patched version
        client.query = query;
      };
      callback(err, client, release);
    });
  },
  executeTransactionAndRelease: async (client, release, callback) => {
    try {
      await client.query('BEGIN');
      callback();
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      release();
    }
  }
};
