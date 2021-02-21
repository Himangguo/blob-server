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
  relaMomentToLabel
} = require("../controller/moment.controller");
momentRouter.post("/create", VerifyAuth, create); // 新增文章/动态
momentRouter.get("/getList", VerifyAuth, getList); // 获取个人文章/动态列表
momentRouter.get("/detail", VerifyAuth, getDetail); // 获取文章详情
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
module.exports = momentRouter;
