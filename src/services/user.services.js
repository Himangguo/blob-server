const connection = require("../app/database");
class UserService {
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO user (name,password) VALUES (?,?);`;
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }
  async updateInfoById(userId, info) {
    const { email, websiteName, age, qq, github } = info;
    console.log(info, userId);
    const statement = `UPDATE user SET email = ? , websiteName = ? , age = ? , qq = ? , github = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [
      email,
      websiteName,
      age,
      qq,
      github,
      userId,
    ]);
    return result;
  }
  async getInfoById(userId) {
    const statement = `SELECT name,createAt,email,websiteName,age,qq,github,avatarUrl FROM user WHERE id = ?`;
    const [result] = await connection.execute(statement, [userId]);
    return result;
  }
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  async updateAvatarById(avatarUrl, id) {
    const statement = `UPDATE user SET avatarUrl = ? WHERE id = ?`;
    const result = await connection.execute(statement, [avatarUrl, id]);
    return result[0];
  }
}

module.exports = new UserService();
