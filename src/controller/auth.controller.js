const jwt = require("jsonwebtoken");
const { SERCET_KEY } = require("../app/config");
class AuthController {
  async login(ctx, next) {
    const { id, name, websiteName } = ctx.user;
    const token = jwt.sign({ id, name, websiteName }, SERCET_KEY, {
      // 设置过期时间为一年
      expiresIn: 60 * 60 * 24 * 353,
    });
    ctx.body = {
      id,
      name,
      websiteName,
      token,
    };
  }
  async success(ctx, next) {
    ctx.body = {
      id: ctx.user.id,
      name: ctx.user.name,
      websiteName: ctx.user.websiteName,
    };
  }
  async verifySuccess(ctx,next) {
    console.log('gggg')
    ctx.body = {
      result: true,
      msg: "校验成功",
      data: {
        id: ctx.user.id,
      },
    };
  }
}

module.exports = new AuthController();
