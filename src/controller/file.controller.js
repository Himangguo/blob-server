const {
  saveAvatar,
  updateAvatar,
  getFileById,
  savePicture,
} = require("../services/file.services");
const { updateAvatarById } = require("../services/user.services");
class FileController {
  async saveAvatarInfo(ctx) {
    console.log("filefile", ctx.req.file);
    try {
      const { filename, mimetype, size } = ctx.req.file;
      const user_id = ctx.user.id;
      const result = await getFileById(user_id);
      if (result) {
        await updateAvatar(filename, mimetype, size, user_id);
      } else {
        await saveAvatar(filename, mimetype, size, user_id); // 将文件信息存入数据库中
        // 将头像url存入user表中
        await updateAvatarById(
          `${process.env.APP_BASE_URL}user/${user_id}/avatar`,
          user_id
        );
      }

      ctx.body = "success";
    } catch (error) {
      console.log(error);
      ctx.body = "发生错误啦";
    }
  }
  async savePictureInfo(ctx) {
    const user_id = ctx.user.id;
    const files = [];
    for (let file of ctx.req.files) {
      const { filename, mimetype, size } = file;
      files.push(filename);
      await savePicture(filename, mimetype, size, user_id);
    }
    ctx.body = {
      result: true,
      data: files,
    };
   
  }
}
module.exports = new FileController();
