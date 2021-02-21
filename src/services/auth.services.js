const connection = require("../app/database");
class AuthServices {
  async checkResource(tablename, id, userId) {
    console.log(id, userId);
    if (tablename === "user") {
      return id == userId ? true : false;
    } else {
      const statement = `SELECT * FROM ${tablename} WHERE id = ? AND user_id = ?`;
      const [result] = await connection.execute(statement, [
        id,
        userId,
      ]);
      return result.length === 0 ? false : true;
    }
  }
}

module.exports = new AuthServices();
