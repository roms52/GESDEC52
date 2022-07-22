const db = require("../models");
const User = db.user;
const Role = db.role;
const User_Role = db.user_role;
const Op = db.Sequelize.Op;
const Sequelize = db.sequelize;
var bcrypt = require("bcryptjs");
const server = require("../../server");


const Models = 
['type_marche', 'type_cout', 'type_tarif_pn', 'indice', 'marche_indice0',
'coeff_actu', 'marche', 'bpu', 'tableau_bord', 'prestataire',
'dechetterie', 'flux', 'prestation', 'facture','user','user_role'];


// Récupère rows de la table en params, avec les jointures si précisées et les colonnes et attributs souhaités dans le rendu du Grid
exports.allDatasOfTable = (req, res) => {

  table = Models.find(el => el === req.params.table);
  columnDef = [];
  rowData =[];
  
      if (table != undefined){   
          const Model = 'db.' + table;
          const Lien = req.query.lien;
          const Attr = req.query.attr;
          const Col = req.query.col
         
          dataReturn = [[]]
  
          if (Lien !== '') {

              eval(Model).findAll({
                  raw: true,
                  include: eval(Lien),                
                  attributes: eval(Attr),
                  order:[['id', 'ASC']]
                })
              .then(rows=>{
                  rowData = rows; 
                  columnDef = (eval(Col));
                                    
                  dataReturn = [rowData,columnDef];
                  server.socket.emit('allDatas',dataReturn);
              res.send(dataReturn);
              })
              .catch(err=>{
                  res.status(500).send({
                      message:
                      err.message || "erreur survenue"
                  });
              });
          }
  
          else {
          
            if(Col !== '') {

              if (Attr !== '') {

                eval(Model).findAll({
                    raw: true,
                    attributes: eval(Attr),
                    order:[['id', 'ASC']]})
                .then(rows=>{
                    rowData = rows; 
                    columnDef = (eval(Col));                 
                
                    dataReturn = [rowData,columnDef];
                    server.socket.emit('allDatas',dataReturn);
                res.send(dataReturn);
                })
                .catch(err=>{
                    res.status(500).send({
                        message:
                        err.message || "erreur survenue"
                    });
                });
              }
              else {

                eval(Model).findAll({
                  raw: true,
                  order:[['id', 'ASC']]})
                .then(rows=>{
                  rowData = rows; 
                  columnDef = (eval(Col)); 
                 
                  dataReturn = [rowData,columnDef];
                  server.socket.emit('allDatas',dataReturn);
                res.send(dataReturn);
                })
                .catch(err=>{
                  res.status(500).send({
                      message:
                      err.message || "erreur survenue"
                  });
                });
              }
            }

            else{

              eval(Model).findAll({
                raw: true,
                order:[['id', 'ASC']]})
            .then(rows=>{
                rowData = rows; 
            
                for( let key in eval(Model).rawAttributes ){
                    columnDef.push({"field": key})
                }

                dataReturn = [rowData,columnDef];
                server.socket.emit('allDatas',dataReturn);
            res.send(dataReturn);
            })
            .catch(err=>{
                res.status(500).send({
                    message:
                    err.message || "erreur survenue"
                });
            });

            }
  
          }
  
      }
  }


  exports.deleteData = (req,res) => {
    table = Models.find(el => el === req.params.table);
    const Model = 'db.' + table;
    id = req.params.id;
  
    eval(Model).destroy({
       where: { id: id} 
    })
        .then(num => {
            if (num == 1){
                res.send({
                    message: "Ligne supprimée"
                });
            } else {
                res.send({
                    message: "Impossible de supprimer la ligne de la table : " + Model + " avec l'id : " + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message :"Erreur"
            });
        });
  };

  exports.createData = (req, res) => {

    table = Models.find(el => el === req.params.table);
    const Model = 'db.' + table;
    const Champs = {};
    
    for(let i=0; i < req.body.length;i++){
      Object.assign(Champs,req.body[i])
    };

    eval(Model).create(      
      eval(Champs)
    )
      .then(res.send({ message: "Data créée avec succès!" }))
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  
  exports.updateData = (req,res) => {
    table = Models.find(el => el === req.params.table);
    const Model = 'db.' + table;
    id = req.params.id;
    const Champs={};

    for(let i=0; i < req.body.length;i++){
      Object.assign(Champs,req.body[i])
    };
  
    eval(Model).update(
      eval(Champs),
      { where:
         { id: id} 
      })
        .then(num => {
            if (num == 1){
                res.send({
                    message: "Ligne mise à jour"
                });
            } else {
                res.send({
                    message: "Impossible de mettre à jour la ligne de la table : " + Model + " avec l'id : " + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message :"Erreur"
            });
        });
  };


// Méthodes READ (user, roles et user_role)

exports.allUser_Role = (req, res) => {
    
 User_Role.findAll({
  include: [{
    model: User,
    attributes:[]},
    {
    model:Role,
    attributes:[]
  }],
  attributes: ['id','id_user','id_role', [Sequelize.col('user.username'),'username'],[Sequelize.col('role.name'),'role']],
  order:[['id', 'ASC']],
  raw : true
})
  .then(data=>{
     server.socket.emit('allUser_Role',data);
      res.send(data);
  })
  .catch(err=>{
      res.status(500).send({
          message:
          err.message || "erreur survenue"
      });
  });
};

exports.allUser = (req, res) => {

  User.findAll({
    order:[['id', 'ASC']],
    raw: true})
          .then(data=>{
            server.socket.emit('allUser',data);
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                err.message || "erreur survenue"
            });
        });
  
  }


  exports.allRole = (req, res) => {
    
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
  
  // Méthodes CREATE

  exports.createUserRole = (req, res) => {

    // Save User_Role to Database
    User_Role.create({
      id_user: req.body.id_user,
      id_role: req.body.id_role
    })
      .then(res.send({ message: "Utilisateur/Role enregistré avec succès!" }))
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  

   // Méthodes DELETE

  exports.deleteUser = (req,res) => {
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


  exports.deleteUserRole = (req,res) => {
    const id = req.params.id;
  
    User_Role.destroy({
       where: { id: id} 
    })
        .then(num => {
            if (num == 1){
                res.send({
                    message: "Utilisateur/role supprimé"
                });
            } else {
                res.send({
                    message: "Impossible de supprimer l'utilisateur/role avec l'id : " + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message :"Erreur"
            });
        });
  };

 // Méthodes UPDATE

exports.updateUser = (req, res) => {
  
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



exports.updateUserRole = (req, res) => {
  
  User_Role.update({
    id_user: req.body.id_user,
    id_role: req.body.id_role,
  },{where: {
    id: req.params.id
  },
  returning: true,
  plain: true})
    .then(res.send({ message: "User was registered successfully!" }))   
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};