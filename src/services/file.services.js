const connect = require("../app/database");
class FileServices {
  async saveAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename,mimetype,size,user_id) VALUES(?,?,?,?)`;
    const [result] = await connect.execute(statement,[filename, mimetype, size, userId]);
    return result;
  }
  async updateAvatar(filename, mimetype, size,userId) {
    const statement = `UPDATE avatar SET filename=?,mimetype=?,size=? WHERE user_id=?`;
    const [result] = await connect.execute(statement,[filename, mimetype, size, userId]);
    return result;
  }
  async savePicture(filename,mimetype,size,momentId,userId){
    const statement = `INSERT INTO picture (filename,mimetype,size,moment_id,user_id) VALUES(?,?,?,?,?)`;
    const [result] = await connect.execute(statement,[filename, mimetype, size,momentId, userId]);
    return result;
  }
  async getFileById(userId){
    const statement = `SELECT mimetype,filename FROM avatar WHERE user_id = ?`;
    const [result] = await connect.execute(statement,[userId]);
    return result[0];
  }

}

module.exports = new FileServices();
