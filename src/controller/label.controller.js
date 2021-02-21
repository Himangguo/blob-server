const {
  getLabelsList,
  createLabel,
  selectLabelByName,
} = require("../services/label.services");
const errorTypes = require("../constants/error-types");
class LabelController {
  async getLabelList(ctx, next) {
    console.log("conroller", ctx.request.query);
    const { offset, size } = ctx.request.query;
    const result = await getLabelsList(offset, size);
    ctx.body = result;
  }
  async createLabel(ctx, next) {
    console.log("createLabel", ctx.request.body);
    const { labels } = ctx.request.body;
    let ids = [];
    for (let label of labels) {
      const item = await selectLabelByName(label);
      if (!item) {
        const { insertId } = await createLabel(label);
        ids.push(insertId);
      } else {
        ids.push(item.id);
      }
    }
    
    ctx.body = {
      ids,
    };
  }
}
module.exports = new LabelController();
