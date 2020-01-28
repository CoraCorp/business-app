'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db
    .createTable('users', {
      id: { type: 'string', primaryKey: true }
    })
    .then(() =>
      db.createTable('applications', {
        id: { type: 'uuid', primaryKey: true },
        name: { type: 'string', notNull: true },
        origin_url: { type: 'string' },
        subscriber_url: { type: 'string' }
      })
    )
    .then(() =>
      db.createTable('user_applications', {
        user_id: {
          type: 'string',
          primaryKey: true,
          foreignKey: {
            name: 'user_application_user_id_fk',
            table: 'users',
            rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT'
            },
            mapping: 'id'
          }
        },
        application_id: {
          type: 'uuid',
          primaryKey: true,
          foreignKey: {
            name: 'user_application_application_id_fk',
            table: 'applications',
            rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT'
            },
            mapping: 'id'
          }
        }
      })
    );
};

exports.down = function(db) {
  return db
    .dropTable('user_applications')
    .then(() => db.dropTable('applications'))
    .then(() => db.dropTable('users'));
};

exports._meta = {
  version: 1
};
