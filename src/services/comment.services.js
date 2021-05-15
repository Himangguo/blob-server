const connection = require("../app/database");
class CommentServices {
  async create(blogUserId, momentId, userId, content, type) {
    const statement = `INSERT INTO comment (content,user_id,moment_id,blogUserId,type) VALUES (?,?,?,?,?);`;
    const [result] = await connection.execute(statement, [
      content,
      userId,
      momentId,
      blogUserId,
      type
    ]);
    return result;
  }
  async reply(blogUserId, momentId, userId, content, commentId,type) {
    const statement = `INSERT INTO comment (content,user_id,moment_id,comment_id,blogUserId,type) VALUES (?,?,?,?,?,?);`;
    const [result] = await connection.execute(statement, [
      content,
      userId,
      momentId,
      commentId,
      blogUserId,
      type
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
  async getCommentByMomentId(blogUserId, momentId, type) {
    const statement = `SELECT 
    c.id,c.content,c.createAt updateTime,
		(case
		when u.id is not null then JSON_OBJECT('id',u.id,'name',u.name,'avatar',u.avatarUrl)
		else null
		end
		) user, 
		c.valid valid,c.comment_id parentId
    FROM comment c
    LEFT JOIN user u
    ON c.user_id = u.id
    ${type==='1'?'WHERE  c.moment_id = ? AND c.type = ?':'WHERE c.blogUserId = ? AND c.type = ?'}
    ORDER BY c.createAt desc;
    `;
    if(type==='1'){
      const [result] = await connection.execute(statement, [momentId,type]);
      return result;
    }else {
      const [result] = await connection.execute(statement, [blogUserId,type]);
      return result;
    }
 
   
  }
  async updateCommentValid(commentId, valid) {
    const statement = `UPDATE comment set valid = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [valid, commentId]);
    return result;
  }
}
module.exports = new CommentServices();
