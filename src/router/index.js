const fs = require("fs");
const useRoutes = function () {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js") return;
    const Router = require(`./${file}`);
    this.use(Router.routes());
    this.use(Router.allowedMethods());
  });
};
module.exports = useRoutes;
