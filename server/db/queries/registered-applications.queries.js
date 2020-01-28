const db = require('../index');

module.exports = {
  getAllByUserId: async userId => {
    const { rows } = await db.query(
      `
    SELECT
      a.id,
      a.name,
      a.origin_url AS "originUrl",
      a.subscriber_url AS "subscriberUrl"
    FROM applications AS a
    JOIN user_applications AS ua ON a.id = ua.application_id
    JOIN users AS u ON ua.user_id = u.id
    WHERE u.id = $1
    `,
      [userId]
    );
    return rows;
  },
  getByUserId: async (userId, id) => {
    const { rows } = await db.query(
      `
    SELECT
      a.id,
      a.name,
      a.origin_url AS "originUrl",
      a.subscriber_url AS "subscriberUrl"
    FROM applications AS a
    JOIN user_applications AS ua ON a.id = ua.application_id
    JOIN users AS u ON ua.user_id = u.id
    WHERE u.id = $1 AND a.id = $2
    `,
      [userId, id]
    );
    return rows[0];
  },
  createAppByUserId: async (userId, app) => {
    db.getClient(async (err, client, release) => {
      if (!err) {
        db.executeTransactionAndRelease(client, release, async () => {
          const applicationRes = await client.query(
            `
            INSERT INTO applications (id, name, origin_url, subscriber_url)
            VALUES ($1, $2, $3, $4)
            RETURNING
              id,
              name,
              origin_url AS "originUrl",
              subscriber_url AS "subscriberUrl"
            `,
            [app.id, app.name, app.originUrl, app.subscriberId]
          );

          await client.query(
            `
              INSERT INTO user_applications (user_id, application_id)
              VALUES ($1, $2)
            `,
            [userId, applicationRes.rows[0].id]
          );
        });
      }
    });
  },
  updateAppByUserId: async (userId, app) => {
    const { rows } = await db.query(
      `
      UPDATE applications AS a
      SET
        name = $1,
        origin_url = $2,
        subscriber_url = $3
      FROM user_applications AS ua
      WHERE
        a.id = $4
        AND ua.user_id = $5
      RETURNING
        id,
        name,
        origin_url AS "originUrl",
        subscriber_url AS "subscriberUrl"
      `,
      [app.name, app.originUrl, app.subscriberUrl, app.id, userId]
    );
    return rows[0];
  }
};
