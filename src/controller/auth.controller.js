const jwt = require("jsonwebtoken");
const { SERCET_KEY } = require("../app/config");
class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, SERCET_KEY, {
      // 设置过期时间为一年
      expiresIn: 60 * 60 * 24 * 353,
    });
    ctx.body = {
      id,
      name,
      token,
    };
  }
  success(ctx, next) {
    ctx.body = {
      id: ctx.user.id,
      name: ctx.user.name,
    };
  }
}

module.exports = new AuthController();
