const connection = require("../app/database");
class AuthServices {
  async checkResource(tablename, id, userId) {
    console.log(id, userId);
    if (tablename === "user") {
      return id == userId ? true : false;
    } else {
      const statement = `SELECT * FROM ${tablename} WHERE id = ? AND user_id = ?`;
      const statement_null = `SELECT * FROM ${tablename} WHERE id = ? AND user_id IS NULL`;
      const [result] = await connection.execute(statement, [id, userId]);
      const [result2] = await connection.execute(statement_null, [id]);
      return result.length === 0 && result2.length === 0 ? false : true;
    }
  }
  async checkMulitResource(id,majorTable,secondTable,columnName,userid){
    const statement = `SELECT ${columnName} FROM ${secondTable} WHERE id = ?`;
    const [result] =await connection.execute(statement,[id]);
    const statement2 = `SELECT * FROM ${majorTable} WHERE id = ? AND user_id = ?`
    const [result2] = await connection.execute(statement2,[result[0][columnName],userid])
    return result2.length === 0?false:true;
  }
}

module.exports = new AuthServices();
