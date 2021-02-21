const Router = require("koa-router");
const labelRouter = new Router({ prefix: "/label" });
const { getLabelList,createLabel } = require("../controller/label.controller");
const { VerifyAuth } = require("../middleware/auth.middleware");
labelRouter.post("/createLabel", VerifyAuth, createLabel);
labelRouter.get("/labelList", getLabelList);
module.exports = labelRouter;
