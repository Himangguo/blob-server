const jwt = require("jsonwebtoken");
const { SERCET_KEY } = require("../app/config");
const errorTypes = require("../constants/error-types");
const userService = require("../services/user.services");
const authServices = require("../services/auth.services");
const { md5Password } = require("../utils/password-handle");

// 验证登录是否成功
const VerifyLogin = async (ctx, next) => {
  console.log("开始校验");
  const { name, password } = ctx.request.body;
  // 判断账号密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  // 查看是否存在此账号
  const result = await userService.getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errorTypes.USER_IS_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  // 查看密码是否正确
  if (md5Password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }

  // 当所有验证通过时
  ctx.user = {
    id: user.id,
    name: user.name,
    websiteName:user.websiteName
  };
  await next();
};

// 验证是否token有效
const VerifyAuth = async (ctx, next) => {
  // 1、获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  // 去除postman中的authorization前缀
  const token = authorization.replace("Bearer ", "");
  // 2、验证token的有效性
  
    const result = jwt.verify(token, SERCET_KEY);
    ctx.user = result;
    await next();
  
};

// 验证是否有操作权限
const verifyPermission = (tablename) => {
  return async (ctx, next) => {
    try {
      // 获取用户id
      const { id: userId } = ctx.user;
      // 获取params中的id名
      const [key] = Object.keys(ctx.params);
      const id = ctx.params[key]
      const permission = await authServices.checkResource(
        tablename,
        id,
        userId
      );
      if (!permission) {
        const error = new Error(errorTypes.NO_OPERATION_PERMISSION);
        return ctx.app.emit("error", error, ctx);
      }
      await next();
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports = {
  VerifyLogin,
  VerifyAuth,
  verifyPermission,
};
