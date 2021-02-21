const Router = require("koa-router");

const userRouter = new Router({ prefix: "/user" });

const { create, update,getInfo } = require("../controller/user.controller");
const { VerifyUser, handlePassword } = require("../middleware/user.middleware");
const {
  VerifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
userRouter.post("/", VerifyUser, handlePassword, create); // 用户注册路由
userRouter.patch("/:userId", VerifyAuth, verifyPermission("user"), update); //修改个人信息路由
userRouter.get("/getInfo",VerifyAuth,getInfo); // 获取个人信息
module.exports = userRouter;
