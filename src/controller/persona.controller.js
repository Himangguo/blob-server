const axios = require("axios");
const {
  setupMusicById,
  patchMusicById,
  getBgMusicId,
} = require("../services/persona.services");
class PersonaController {
  async search(ctx, next) {
    const { keywords } = ctx.query;
    console.log(keywords);
    try {
      const result = await axios({
        url: "http://39.108.236.42:3000/search",
        header: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
        },
        method: "GET",
        params: {
          keywords,
        },
      });
      ctx.body = result.data;
    } catch (error) {
      console.log(error);
      ctx.body = error;
    }
  }
  async setupMusic(ctx, next) {
    const { id } = ctx.user;
    const { musicId } = ctx.request.body;
    console.log(id, musicId);
    await setupMusicById(id, musicId);
    ctx.body = {
      result: true,
      msg: "背景乐设置成功",
      data: musicId,
    };
  }
  async patchMusic(ctx, next) {
    const { id } = ctx.user;
    const { musicId } = ctx.request.body;
    await patchMusicById(id, musicId);
    ctx.body = {
      result: true,
      msg: "背景乐修改成功",
      data: musicId,
    };
  }
  async getBgMusicId(ctx, next) {
    const { id } = ctx.user;
    console.log(id);
    try {
      const [result] = await getBgMusicId(id);
      console.log(result);
      if (result) {
        ctx.body = result;
      } else {
        ctx.body = {
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new PersonaController();
