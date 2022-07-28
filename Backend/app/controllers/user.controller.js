const db = require("../models");
const User = db.user;
const Role = db.role;
const User_Role = db.user_role;
const Op = db.Sequelize.Op;
const Sequelize = db.sequelize;
var bcrypt = require("bcryptjs");
const server = require("../../server");
const authController = require("../controllers/auth.controller");


const Models = 
['type_marche', 'type_cout', 'type_tarif_pn', 'indice', 'marche_indice0',
'coeff_actu', 'marche', 'bpu', 'prestataire',
'dechetterie', 'flux', 'prestation', 'facture','user','user_role'];


// Récupère rows de la table en params, avec les jointures si précisées et les colonnes et attributs souhaités dans le rendu du Grid
exports.allDatasOfTable = (req, res) => {

  table = req.params.table;
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



 