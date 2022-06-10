const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/admin.controller");
const auth_controller = require("../controllers/auth.controller");
const common_controller = require("../controllers/common.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  // récupérer la liste des user et des roles ainsi que les colonnes que l'on veut afficher dans l'appli
  app.get("/api/admin/alluser", [authJwt.verifyToken, authJwt.isAdmin], controller.allUserSelect);
  app.get("/api/admin/allrole",  [authJwt.verifyToken, authJwt.isAdmin], controller.allRoleSelect);
  app.get("/api/admin/select_attr",  [authJwt.verifyToken, authJwt.isAdmin], controller.getAdminAttributes);

  // créer, supprimer, modifier un user
  app.post("/api/admin/user",  [authJwt.verifyToken, authJwt.isAdmin], auth_controller.signup);
  app.delete("/api/admin/user/:id",  [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
  app.post("/api/admin/user/:id",[
    authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkRolesExisted
  ],controller.update)

  app.get("/common/datas/:table",common_controller.allDatasOfTable)
};