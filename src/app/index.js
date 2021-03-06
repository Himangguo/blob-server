const Koa = require("koa");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");

const errorHandle = require("../app/error-handle");
const useRoutes = require("../router");
const app = new Koa();

/* process.on("uncaughtException", function (err) {
  console.log("uncaughtException", err);
});
process.on("unhandledRejection", function (err, promise) {
  console.log("unhandledRejection", err);
}); */

// 使用第三方中间件
app.use(cors());
app.use(bodyParser());
app.useRoutes = useRoutes;
app.useRoutes();
app.on("error", errorHandle);
module.exports = {
  app,
};
