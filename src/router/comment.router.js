const Router = require("koa-router");
const commentRouter = new Router({ prefix: "/comment" });

const {
  create,
  reply,
  update,
  remove,
  getList,
  updateValid
} = require("../controller/comment.controller");
const {
  VerifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");

commentRouter.post("/", VerifyAuth, create);
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
  verifyPermission("comment"),
  updateValid
);

commentRouter.post("/valid", VerifyAuth, verifyPermission("comment"));
commentRouter.delete(
  "/:commentId",
  VerifyAuth,
  verifyPermission("comment"),
  remove
);
commentRouter.get("/", getList);
module.exports = commentRouter;
