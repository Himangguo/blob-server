const errorTypes = require("../constants/error-types");
const userService = require("../services/user.services");
const { md5Password } = require("../utils/password-handle");
const VerifyUser = async (ctx, next) => {
  try {
    console.log("userMiddleware");
    const { name, password } = ctx.request.body;
    if (!name || !password) {
      const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
      return ctx.app.emit("error", error, ctx);
    }

    const result = await userService.getUserByName(name);
    if (result.length) {
      const error = new Error(errorTypes.USER_IS_EXISTS);
      return ctx.app.emit("error", error, ctx);
    }
    await next();
  } catch (error) {
    console.log(error);
  }
};

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  // md5加密
  ctx.request.body.password = md5Password(password);
  await next();
};

module.exports = {
  VerifyUser,
  handlePassword,
};
