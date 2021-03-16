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
  async getCommentByMomentId(momentId) {
    const statement = `SELECT 
    c.id,c.content,c.updateAt updateTime,
		(case
		when u.id is not null then JSON_OBJECT('id',u.id,'name',u.name,'avatar',u.avatarUrl)
		else null
		end
		) user, 
		c.valid valid,c.comment_id parentId
    FROM comment c
    LEFT JOIN user u
    ON c.user_id = u.id
    WHERE c.moment_id = ? AND c.type = 1;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
  async updateCommentValid(commentId, valid) {
    const statement = `UPDATE comment set valid = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [valid, commentId]);
    return result;
  }
}
module.exports = new CommentServices();
