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
  async getListByUserId(userId) {
    const statement = `SELECT m.id,m.title,m.content,m.valid,m.user_id userId,m.updateAt updateTime,
    (SELECT JSON_ARRAYAGG(l.name) FROM moment_label ml LEFT JOIN label l ON ml.label_id = l.id WHERE m.id = ml.moment_id) labels,
		(SELECT JSON_ARRAYAGG(CONCAT('${process.env.APP_BASE_URL}moment/',p.id,'/picture')) FROM picture p LEFT JOIN moment mo  ON p.user_id = mo.id WHERE m.id = p.moment_id) pictures
    FROM moment m
    WHERE m.user_id = ?
    ORDER BY m.updateAt DESC;`;
    const [result] = await connection.execute(statement, [userId]);
    return result;
  }
  async getOrderListByUserId(userId) {
    const statement = `SELECT m.id,m.title,m.content,m.valid,m.user_id userId,m.createAt createTime,
    (SELECT JSON_ARRAYAGG(l.name) FROM moment_label ml LEFT JOIN label l ON ml.label_id = l.id WHERE m.id = ml.moment_id) labels,
		(SELECT JSON_ARRAYAGG(CONCAT('${process.env.APP_BASE_URL}moment/',p.id,'/picture')) FROM picture p LEFT JOIN moment mo  ON p.user_id = mo.id WHERE m.id = p.moment_id) pictures
    FROM moment m
    WHERE m.user_id = ?
    ORDER BY m.createAt DESC;`;
    const [result] = await connection.execute(statement, [userId]);
    return result;
  }
  async getDetailById(momentId) {
    const statement = `SELECT m.id,m.title,m.content,m.valid,m.user_id userId,m.updateAt updateTime,
    (SELECT JSON_ARRAYAGG(l.name) FROM moment_label ml LEFT JOIN label l ON ml.label_id = l.id WHERE m.id = ml.moment_id) labels,
		(SELECT JSON_ARRAYAGG(CONCAT('${process.env.APP_BASE_URL}moment/',p.id,'/picture')) FROM picture p LEFT JOIN moment mo  ON p.user_id = mo.id WHERE m.id = p.moment_id) pictures,
		(SELECT JSON_ARRAYAGG(p.filename) FROM picture p LEFT JOIN moment mo  ON p.user_id = mo.id WHERE m.id = p.moment_id) fileNames
    FROM moment m
    WHERE m.id = ?;`;
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
  async getPictureInfById(picId) {
    const statement = `SELECT filename,mimetype FROM picture WHERE id=?`;
    const [result] = await connection.execute(statement, [picId]);
    return result[0];
  }
  async getThumbsUpNum(momentId) {
    const statement = `SELECT thumbsUp FROM moment WHERE id = ?`;
    const [result] = await connection.execute(statement, [momentId]);
    return result[0];
  }
  async addThumbsUpNum(momentId, num) {
    const statement = `UPDATE moment SET thumbsUp = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [num, momentId]);
    return result;
  }
  async relaPicToMoment(filename, momentId) {
    const statement = `UPDATE picture SET moment_id = ? WHERE filename = ?`;
    const [result] = await connection.execute(statement, [momentId, filename]);
    return result;
  }
  async validChange(momentId, valid) {
    const statement = `UPDATE moment SET valid = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [valid, momentId]);
    return result;
  }
  async delPicOfMoment(momentId) {
    const statement = `DELETE FROM picture WHERE moment_id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
  async delLabelsOfMoment(momentId) {
    const statement = `DELETE FROM moment_label WHERE moment_id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}
module.exports = new MomentServices();
