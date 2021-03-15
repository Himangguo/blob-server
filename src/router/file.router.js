const Router = require("koa-router");
const fileRouter = new Router({ prefix: "/upload" });
const { VerifyAuth } = require("../middleware/auth.middleware");
const {avatarHandle,pictureHandle,pictureResize} = require('../middleware/file.middleware');
const {saveAvatarInfo,savePictureInfo} = require("../controller/file.controller");
fileRouter.post("/avatar", VerifyAuth,avatarHandle,saveAvatarInfo);
fileRouter.post("/picture",VerifyAuth,pictureHandle,pictureResize,savePictureInfo);
module.exports = fileRouter;
