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
  async selectArticleListOfLabel(userId) {
    const statement = `
    SELECT DISTINCT l.id as id, l.name as name, 
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('id',m.id ,'title', m.title,'valid',m.valid)) FROM moment_label ml LEFT JOIN moment m ON ml.moment_id = m.id WHERE m.user_id = ? AND l.id = ml.label_id ) as momentList
   FROM label l
   LEFT JOIN moment_label ON moment_label.label_id = l.id
   LEFT JOIN moment ON moment.id = moment_label.moment_id
   WHERE moment.user_id = ?;
   
    `
    const [result] = await connection.execute(statement,[userId,userId]);
    return result;
  }
}

module.exports = new LabelServices();
