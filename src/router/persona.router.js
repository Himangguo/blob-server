const Router = require("koa-router");
const personaRouter = new Router({prefix:"/persona"});
const {VerifyAuth} = require("../middleware/auth.middleware");
const {search,setupMusic,patchMusic} = require("../controller/persona.controller");
personaRouter.get("/music/search",search);
personaRouter.post("/music/setup",VerifyAuth,setupMusic);
personaRouter.patch("/music/patch",VerifyAuth,patchMusic)
module.exports = personaRouter;