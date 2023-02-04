const { row, rows } = require('../utils/db');

module.exports = class User {
  constructor(id, role, login, password) {
    this.id = id;
    this.role = role;
    this.login = login;
    this.password = password;
  }

  static findOne(login, password) {
    const findOneSql = `SELECT id, role, login FROM users where login = $1 and password = crypt($2, password)`;

    return row(findOneSql, login, password);
  }
};
