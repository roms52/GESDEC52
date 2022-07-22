const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/admin.controller");
const auth_controller = require("../controllers/auth.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Obtenir, créer, modifier, supprimer sur toutes les tables
  app.post("/api/admin/:table",  [authJwt.verifyToken, authJwt.isAdmin], controller.createData);
  app.get("/api/admin/:table",controller.allDatasOfTable)
  app.delete("/api/admin/:table/:id",controller.deleteData)
  app.post("/api/admin/:table/:id",  [authJwt.verifyToken, authJwt.isAdmin], controller.updateData);
  
  
  // Obtenir tous les users, roles et user_role
  app.get("/api/admin/user_role", controller.allUser_Role);
  app.get("/api/admin/user",  controller.allUser);
  app.get("/api/admin/allrole", controller.allRole);

  // créer, supprimer, modifier un user
  app.post("/api/admin/user",  [authJwt.verifyToken, authJwt.isAdmin], auth_controller.signup);
  app.delete("/api/admin/user/:id",  [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);
  app.post("/api/admin/user/:id",[
    authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkRolesExisted
  ],controller.updateUser)


  // créer, supprimer, modifier  user_role
  app.post("/api/admin/user_role",  [authJwt.verifyToken, authJwt.isAdmin], controller.createUserRole);
  app.delete("/api/admin/user_role/:id",  [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUserRole);
  app.post("/api/admin/user_role/:id",[
    authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkRolesExisted
  ],controller.updateUserRole)
  
};