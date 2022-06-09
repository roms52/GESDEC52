const db = require("../models");
const ROLES = [1, 2];
const User = db.user;


checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Erreur! Ce nom d'utilisateur est déjà pris!"
      });
      return;
    }
    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Erreur! Cet email est déjà utilisé!"
        });
        return;
      }
      next();
    });
  });
};


checkRolesExisted = (req, res, next) => {
  if (req.body.id_role) {
    for (let i = 0; i < req.body.id_role.length; i++) {
      if (!ROLES.includes(req.body.id_role[i])) {
        res.status(400).send({
          message: "Erreur! Ce rôle n'existe pas = " + req.body.id_role[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;