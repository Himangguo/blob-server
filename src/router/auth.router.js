const Router = require("koa-router");
const authRouter = new Router();
const { login, success,verifySuccess } = require("../controller/auth.controller");
const { VerifyLogin, VerifyAuth } = require("../middleware/auth.middleware");
authRouter.post("/login", VerifyLogin, login);
authRouter.get("/test", VerifyAuth, success);
authRouter.post("/verify",VerifyLogin,verifySuccess);
module.exports = authRouter;
