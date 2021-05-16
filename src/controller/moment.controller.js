const fs = require("fs");
const moment = require("moment");
const {
  create,
  getListByUserId,
  getOrderListByUserId,
  getDetailById,
  updateMomentById,
  delMomentById,
  relaMomentToLabel,
  getPictureInfById,
  getThumbsUpNum,
  addThumbsUpNum,
  relaPicToMoment,
  validChange,
  delPicOfMoment,
  delLabelsOfMoment,
} = require("../services/moment.services");
const {
  createLabel,
  selectLabelByName,
} = require("../services/label.services");
class MomentController {
  async create(ctx, next) {
    const { id } = ctx.user;
    const { title, content, fileList } = ctx.request.body;
    console.log(id, title, content, fileList);
    try {
      const result = await create(id, title, content);
      if (result.insertId) {
        // 将文章id与图片标识符绑定
        for (let filename of fileList) {
          await relaPicToMoment(filename, result.insertId);
        }
      }
      ctx.body = {
        result: true,
        msg: "文章发布成功",
        data: result.insertId,
      };
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
    const { title, content, fileList, labels } = ctx.request.body;
    const { momentId } = ctx.params;
    console.log(momentId, title, content, fileList, labels);
    await updateMomentById(momentId, title, content);
    const labelIds = [];
    // 删除原来文章配图，删除原来文章标签
    await delPicOfMoment(momentId);
    await delLabelsOfMoment(momentId);
    // 重建配图关系、重建标签关系
    for (let filename of fileList) {
      await relaPicToMoment(filename, momentId);
    }
    for (let name of labels) {
      const result = await selectLabelByName(name);
      if (result) {
        labelIds.push(result.id);
      } else {
        const labelObj = await createLabel(name);
        labelIds.push(labelObj.insertId);
      }
    }
    for (let label of labelIds) {
      await relaMomentToLabel(momentId, label);
    }
    ctx.body = {
      result: true,
      msg: "修改成功",
    };
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
      msg: "标签关联成功",
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
    await addThumbsUpNum(momentId, thumbsUp + 1);
    ctx.body = {
      result: true,
      msg: "文章点赞成功",
      data: thumbsUp + 1,
    };
  }
  async validAction(ctx, next) {
    const { momentId } = ctx.params;
    const { valid } = ctx.request.body;
    console.log(momentId, valid);
    const result = await validChange(momentId, valid);
    ctx.body = {
      result: true,
      msg: "文章有效性修改成功",
      data: valid,
    };
  }
  async getOrderList(ctx, next) {
    const { id } = ctx.user;
    try {
      const result = await getOrderListByUserId(id);
      // 处理文章列表
      let resList = [];
      for (let i = 0; i < result.length; i++) {
        const len = resList.length;
        if (len - 1 < 0) {
          const data = {
            year: moment(result[i].createTime).toDate().getFullYear(),
            month: moment(result[i].createTime).toDate().getMonth() + 1,
            list: [result[i]],
          };
          resList.push(data);
        } else {
          const year = moment(result[i].createTime).toDate().getFullYear();
          const month = moment(result[i].createTime).toDate().getMonth() + 1;
          if (
            resList[len - 1].year !== year ||
            resList[len - 1].month !== month
          ) {
            const data = {
              year,
              month,
              list: [result[i]],
            };
            resList.push(data);
          } else {
            resList[len - 1].list.push(result[i]);
          }
        }
      }
      ctx.body = {
        list: resList,
      };
    } catch (error) {
      console.log(error);
      ctx.body = error;
    }
  }
}

module.exports = new MomentController();
