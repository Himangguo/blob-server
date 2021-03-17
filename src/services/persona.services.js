const connection = require("../app/database");
class PersonaServices {
  async setupMusicById(userId, musicId) {
    const statement = "INSERT INTO persona(user_id,musicId) VALUES(?,?)";
    const [result] = await connection.execute(statement, [userId, musicId]);
    return result;
  }
  async patchMusicById(userId, musicId) {
    const statement = "UPDATE persona SET musicId = ? WHERE user_id = ?";
    const [result] = await connection.execute(statement, [musicId, userId]);
    return result;
  }
}
module.exports = new PersonaServices();
