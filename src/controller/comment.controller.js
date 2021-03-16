const { tfArrToTree } = require("../utils/tree");
const {
  create,
  reply,
  update,
  remove,
  getCommentByMomentId,
  updateCommentValid,
} = require("../services/comment.services");
class CommentController {
  async create(ctx, next) {
    // 获取momentId，userId，content
    const { momentId, userId = null, content } = ctx.request.body;
    console.log(momentId, userId, content);
    try {
      await create(momentId, userId, content);
      ctx.body = {
        result: true,
        msg: "评论发表成功",
      };
    } catch (error) {
      console.log(error);
    }
  }
  async reply(ctx, next) {
    // 获取momentId，userId，content,commentId
    const { commentId } = ctx.params;
    const { momentId, userId = null, content } = ctx.request.body;
    console.log(momentId, userId, content, commentId);
    await reply(momentId, userId, content, commentId);
    ctx.body = {
      result: true,
      msg: "评论回复成功",
    };
  }
  async update(ctx, next) {
    // 获取content，commentId
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    console.log(commentId, content);
    try {
      const result = await update(commentId, content);
      ctx.body = {
        result: true,
        msg: "评论修改成功",
      };
    } catch (error) {
      console.log(error);
    }
  }
  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await remove(commentId);
    ctx.body = result;
  }
  async getList(ctx, next) {
    const { momentId } = ctx.query;
    console.log(momentId);
    const result = await getCommentByMomentId(momentId);
    // 将result处理为树形
    let tree_result = tfArrToTree(result);
    ctx.body = tree_result;
  }
  async updateValid(ctx, next) {
    const { commentId } = ctx.params;
    const { valid } = ctx.request.body;
    console.log(commentId, valid);
    await updateCommentValid(commentId, valid);
    ctx.body = {
      result: true,
      msg: "评论有效性修改成功",
    };
  }
}

module.exports = new CommentController();
