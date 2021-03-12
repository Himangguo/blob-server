const connection = require("../app/database");
class CommentServices {
  async create(momentId, userId, content) {
    const statement = `INSERT INTO comment (content,user_id,moment_id,type) VALUES (?,?,?,1);`;
    const [result] = await connection.execute(statement, [
      content,
      userId,
      momentId,
    ]);
    return result;
  }
  async reply(momentId, userId, content, commentId) {
    const statement = `INSERT INTO comment (content,user_id,moment_id,comment_id,type) VALUES (?,?,?,?,1);`;
    const [result] = await connection.execute(statement, [
      content,
      userId,
      momentId,
      commentId,
    ]);
    return result;
  }
  async update(commentId, content) {
    const statement = `UPDATE comment set content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }
  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }
  async getCommentByMomentId(momentId, offset, size) {
    const statement = `SELECT 
    c.id,c.content,c.updateAt updateTime, JSON_OBJECT('id',u.id,'name',u.name) user
    FROM comment c
    LEFT JOIN users u
    ON c.user_id = u.id
    WHERE c.moment_id = ?
		LIMIT ?,?;`;
    const [result] = await connection.execute(statement, [
      momentId,
      offset,
      size,
    ]);
    return result;
  }
  async updateCommentValid(commentId,valid) {
    const statement = `UPDATE comment set valid = ? WHERE id = ?`;
    const [result] = await connection.execute(statement,[valid,commentId]);
    return result;
  }
}
module.exports = new CommentServices();
