const connection = require("../app/database");
class LabelServices {
  async getLabelsList(offset, size) {
    const statement = `SELECT id, name FROM label LIMIT ?,?`;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }
  async createLabel(name) {
    const statement = `INSERT INTO label (name) VALUES (?)`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  async selectLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?`;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new LabelServices();
