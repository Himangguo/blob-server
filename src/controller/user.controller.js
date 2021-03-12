const fs = require("fs");
const {
  create,
  updateInfoById,
  getInfoById,
} = require("../services/user.services");
const { getFileById } = require("../services/file.services");
class UserController {
  async create(ctx, next) {
    console.log("将要创建用户", ctx.request.body);
    const { name, password } = ctx.request.body;
    const result = await create({ name, password });
    ctx.body = result;
  }
  async update(ctx, next) {
    console.log("有权限修改用户奥，让我们开始吧");
    const { userId } = ctx.params;
    const info = ctx.request.body;
    const result = await updateInfoById(userId, info);
    ctx.body = result;
  }
  async getInfo(ctx, next) {
    const { id } = ctx.user;
    const result = await getInfoById(id);
    ctx.body = result;
  }
  async getAvatar(ctx, next) {
    const { userId } = ctx.params;
    // 通过userId去avatar表中找到该图片类型
    const { mimetype, filename } = await getFileById(userId);
    ctx.response.set("content-type", mimetype); // 设置响应内容类型
    ctx.body = fs.createReadStream(`${process.env.AVATAR_PATH}/${filename}`);
  }
}

module.exports = new UserController();
