const Router = require("koa-router");
const authRouter = new Router();
const { login, success } = require("../controller/auth.controller");
const { VerifyLogin, VerifyAuth } = require("../middleware/auth.middleware");
authRouter.post("/login", VerifyLogin, login);
authRouter.get("/test", VerifyAuth, success);
module.exports = authRouter;
