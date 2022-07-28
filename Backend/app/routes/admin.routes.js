const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/admin.controller");
const authController = require("../controllers/auth.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

   // Obtenir, créer, modifier, supprimer sur toutes les tables

   // Exception pour la table user afin de hasher le mot de passe
   app.post("/api/admin/user",[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],authController.signup);
   app.post("/api/admin/user/:id",[authJwt.verifyToken, authJwt.isAdmin],controller.updateUser);

   // Pour toutes les autres
   app.post("/api/admin/:table",  [authJwt.verifyToken, authJwt.isAdmin], controller.createData);
   app.get("/api/admin/:table",controller.allDatasOfTable)
   app.delete("/api/admin/:table/:id",controller.deleteData)
   app.post("/api/admin/:table/:id",  [authJwt.verifyToken, authJwt.isAdmin], controller.updateData);
  
   
  
 
  
};