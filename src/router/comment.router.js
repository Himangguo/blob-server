const Router = require("koa-router");
const commentRouter = new Router({ prefix: "/comment" });

const {
  create,
  reply,
  update,
  remove,
  getList,
  updateValid,
} = require("../controller/comment.controller");
const {
  VerifyAuth,
  verifyPermission,
  verifyPermission_multiple
} = require("../middleware/auth.middleware");

commentRouter.post("/", VerifyAuth, create); // 发表评论
commentRouter.post("/:commentId/reply", VerifyAuth, reply);

commentRouter.patch(
  "/:commentId",
  VerifyAuth,
  verifyPermission("comment"),
  update
);

// 修改评论的有效性
commentRouter.patch(
  "/:commentId/valid",
  VerifyAuth,
  verifyPermission_multiple("moment","comment","moment_id"),
  updateValid
);

commentRouter.post("/valid", VerifyAuth, verifyPermission("comment"));
commentRouter.delete(
  "/:commentId",
  VerifyAuth,
  verifyPermission("comment"),
  remove
);
commentRouter.get("/",VerifyAuth, getList);
module.exports = commentRouter;
