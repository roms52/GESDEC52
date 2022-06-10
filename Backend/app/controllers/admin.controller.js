const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
const server = require("../../server");



  
exports.allUserSelect = (req, res) => {
    
 User.findAll({
  include:  
   {
    model: Role,
    attributes: [['id','id_role']],
    through: {
      attributes: []
    }
  },
  attributes: ['id','username', 'email', 'password', 'roles.name'],
  raw : true
})
  .then(data=>{
     server.socket.emit('allUsers',data);
      res.send(data);
  })
  .catch(err=>{
      res.status(500).send({
          message:
          err.message || "erreur survenue"
      });
  });
};


exports.allRoleSelect = (req, res) => {
    
  Role.findAll()
   .then(data=>{
       res.send(data);
   })
   .catch(err=>{
       res.status(500).send({
           message:
           err.message || "erreur survenue"
       });
   });
 };

exports.getAdminAttributes = (req, res) => {
  array_role = [];
  array_user = [];
  for( let key in User.rawAttributes ){ 
      
      array_user.push({"field": key ,filter: 'agTextColumnFilter'});
    
  }
  for( let key in Role.rawAttributes ){ 
      
    array_role.push({"field": key, filter: 'agTextColumnFilter'});
  
}

  array_user.shift();
  array_role.shift();
  res.send(array_user.concat(array_role));
};

exports.delete = (req,res) => {
  const id = req.params.id;

  User.destroy({
     where: { id: id} 
  })
      .then(num => {
          if (num == 1){
              res.send({
                  message: "Utilisateur supprimé"
              });
          } else {
              res.send({
                  message: "Impossible de supprimer l'utilisateur avec l'id : " + id
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message :"Erreur"
          });
      });
};

exports.update = (req, res) => {
  // Save User to Database
  User.update({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  },{where: {
    id: req.params.id
  },
  returning: true,
  plain: true})
    .then(user => {
      if (req.body.id_role) {
        Role.findAll({
          where: {
            id: {
              [Op.eq]: req.body.id_role
            }
          }
        }).then(roles => {
          user[1].setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user[1].setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};