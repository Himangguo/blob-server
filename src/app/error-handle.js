const errorTypes = require("../constants/error-types");
const errorHandle = (error, ctx) => {
  let status = "";
  let body = "";
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      body = "用户名或者密码不能为空";
      break;
    case errorTypes.USER_IS_EXISTS:
      status = 409;
      body = "用户名已存在";
      break;
    case errorTypes.USER_IS_NOT_EXISTS:
      status = 400;
      body = "用户名不存在";
      break;
    case errorTypes.PASSWORD_INCORRECT:
      status = 400;
      body = "密码错误";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401;
      body = "无效的token";
      break;
    case errorTypes.NO_OPERATION_PERMISSION:
      status = 401;
      body = "没有操作权限";
      break;
    default:
      status = 404;
      body = "NOT FOUND";
  }
  ctx.status = status;
  ctx.body = body;
};

module.exports = errorHandle;
