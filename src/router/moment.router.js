const Router = require("koa-router");
const momentRouter = new Router({ prefix: "/moment" });
const {
  VerifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const {
  create,
  getList,
  getDetail,
  update,
  del,
  relaMomentToLabel,
  getPicture,
  giveThumbsUp,
  validAction,getOrderList
} = require("../controller/moment.controller");
momentRouter.post("/create", VerifyAuth, create); // 新增文章/动态
momentRouter.get("/getList", VerifyAuth, getList); // 获取个人文章/动态列表
momentRouter.get("/getOrderList",VerifyAuth,getOrderList); // 获取按照年份，月份排好序的文章列表
momentRouter.get("/detail", getDetail); // 获取文章详情
momentRouter.patch("/:momentId/valid",VerifyAuth,verifyPermission("moment"),validAction); // 文章有效性修改
// 将文章与标签关联起来
momentRouter.post(
  "/:momentId/relaMomentToLabel",
  VerifyAuth,
  verifyPermission("moment"),
  relaMomentToLabel
);
momentRouter.patch(
  "/:momentId/update",
  VerifyAuth,
  verifyPermission("moment"),
  update
); // 更新文章
momentRouter.delete(
  "/:momentId/delete",
  VerifyAuth,
  verifyPermission("moment"),
  del
);
// 获取文章配图
momentRouter.get("/:picId/picture",getPicture)
// 文章点赞
momentRouter.post("/thumbsup",giveThumbsUp);
module.exports = momentRouter;
