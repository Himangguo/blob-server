const Multer = require("koa-multer");
const Jimp = require("jimp");
const avatarUpload = Multer({
  dest: process.env.AVATAR_PATH,
});
const pictureUpload = Multer({
  dest: process.env.PICTURE_PATH,
});
try {
  var avatarHandle = avatarUpload.single("avatar");
} catch (error) {
  console.log(error);
}

const pictureHandle = pictureUpload.array("picture", 2);
const pictureResize = async (ctx, next) => {
  try {
    const files = ctx.req.files;
    console.log(files);
    for (let file of files) {
      Jimp.read(file.path).then((image) => {
        image.resize(1280, Jimp.AUTO).write(`${file.path}-large`);
        image.resize(640, Jimp.AUTO).write(`${file.path}-middle`);
        image.resize(320, Jimp.AUTO).write(`${file.path}-small`);
      });
    }
    await next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  avatarHandle,
  pictureHandle,
  pictureResize,
};
