const fs = require("fs");
const {
  create,
  getListByUserId,
  getDetailById,
  updateMomentById,
  delMomentById,
  relaMomentToLabel,
  getPictureInfById,
  getThumbsUpNum,
  addThumbsUpNum,
} = require("../services/moment.services");
class MomentController {
  async create(ctx, next) {
    const { id } = ctx.user;
    const { title, content } = ctx.request.body;
    console.log(id, title, content);
    try {
      const result = await create(id, title, content);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
  async getList(ctx, next) {
    const { id } = ctx.user;
    const { offset, size } = ctx.query;
    try {
      const result = await getListByUserId(id);

      ctx.body = {
        offset: parseInt(offset),
        size: parseInt(size),
        total: result.length,
        list: result.slice(offset, offset + size),
      };
    } catch (error) {
      console.log(error);
      ctx.body = error;
    }
  }
  async getDetail(ctx, next) {
    const { id } = ctx.request.query;
    const result = await getDetailById(id);
    ctx.body = result;
  }
  async update(ctx, next) {
    const { title, content } = ctx.request.body;
    const { momentId } = ctx.params;
    console.log(momentId, title, content);
    const result = await updateMomentById(momentId, title, content);
    ctx.body = result;
  }
  async del(ctx, next) {
    const { momentId } = ctx.params;
    const result = await delMomentById(momentId);
    ctx.body = result;
  }
  async relaMomentToLabel(ctx, next) {
    const { momentId } = ctx.params;
    const { labelIds } = ctx.request.body;
    for (let label of labelIds) {
      await relaMomentToLabel(momentId, label);
    }

    ctx.body = {
      result: true,
    };
  }
  async getPicture(ctx, next) {
    const { picId } = ctx.params;
    const { mimetype, filename } = await getPictureInfById(picId);
    console.log(filename, mimetype);
    ctx.response.set("content-type", mimetype); // 设置响应内容类型
    ctx.body = fs.createReadStream(`${process.env.PICTURE_PATH}/${filename}`);
  }
  async giveThumbsUp(ctx, next) {
    const { momentId } = ctx.request.body;
    const { thumbsUp } = await getThumbsUpNum(momentId);
    const result = await addThumbsUpNum(momentId, thumbsUp + 1);
    ctx.body = result;
  }
}

module.exports = new MomentController();
