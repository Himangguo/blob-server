const connection = require("../app/database");
class MomentServices {
  async create(userId, title, content) {
    const statement = `INSERT INTO moment(title,content,user_id) VALUES(?,?,?)`;
    const [result] = await connection.execute(statement, [
      title,
      content,
      userId,
    ]);
    return result;
  }
  async getListByUserId(userId, offset, size) {
    const statement = `SELECT m.id,m.title,m.content,m.user_id userId,m.updateAt updateTime,
    (SELECT JSON_ARRAYAGG(l.name) FROM moment_label ml LEFT JOIN label l ON ml.label_id = l.id WHERE m.id = ml.moment_id) labels,
    (SELECT COUNT(*) FROM moment) total
    FROM moment m
    WHERE m.user_id = ?
    LIMIT ?,?;`;
    const [result] = await connection.execute(statement, [
      userId,
      offset,
      size,
    ]);
    return result;
  }
  async getDetailById(momentId) {
    const statement = `SELECT id,title,content,updateAt FROM moment WHERE  id = ?`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
  async updateMomentById(momentId, title, content) {
    const statement = `UPDATE moment SET title = ?,content = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [
      title,
      content,
      momentId,
    ]);
    return result;
  }
  async delMomentById(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
  async relaMomentToLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label(moment_id,label_id) VALUES(?,?)`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}
module.exports = new MomentServices();
