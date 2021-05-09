const Router = require("koa-router");
const labelRouter = new Router({ prefix: "/label" });
const { getLabelList,createLabel,getArticleOfLabel } = require("../controller/label.controller");
const { VerifyAuth } = require("../middleware/auth.middleware");
labelRouter.post("/createLabel", VerifyAuth, createLabel);
labelRouter.get("/labelList", getLabelList);
labelRouter.get("/labelToArticle",VerifyAuth,getArticleOfLabel);
module.exports = labelRouter;
