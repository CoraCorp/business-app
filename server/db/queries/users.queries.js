const db = require('../index');

module.exports = {
  getById: async id => {
    const { rows } = await db.query(
      `
      SELECT
        id
      FROM users
      WHERE id = $1
    `,
      [id]
    );
    return rows[0];
  },
  create: async id => {
    const { rows } = await db.query(
      `
    INSERT INTO users (id)
    VALUES ($1)
    RETURNING id
    `,
      [id]
    );
    return rows[0];
  }
};
