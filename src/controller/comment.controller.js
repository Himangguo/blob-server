const { tfArrToTree } = require("../utils/tree");
const {
  create,
  reply,
  update,
  remove,
  getCommentByMomentId,
  updateCommentValid,
  createLeaveMsg
} = require("../services/comment.services");
class CommentController {
  async create(ctx, next) {
    const {id} = ctx.user;
    // 获取momentId，userId，content
    const { momentId=null, userId = null, content,type } = ctx.request.body;
    console.log(id,momentId, userId, content,type);
    try {
      await create(id,momentId, userId, content,type);
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
    const {id} = ctx.user;
    const { commentId } = ctx.params;
    const { momentId=null, userId = null, content, type } = ctx.request.body;
    console.log(id,momentId, userId, content, commentId,type);
    await reply(id,momentId, userId, content, commentId,type);
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
    const {id} = ctx.user;
    const { momentId,type } = ctx.query;
    console.log(momentId,type);
    const result = await getCommentByMomentId(id,momentId,type);
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
  async createLeaveMsg(ctx, next) {
    // 获取blogUserId，userId，content
    const {id} = ctx.user;
    const {  userId = null, content } = ctx.request.body;
    console.log(id, userId, content);
    try {
      await createLeaveMsg(id, userId, content);
      ctx.body = {
        result: true,
        msg: "留言发表成功",
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CommentController();
