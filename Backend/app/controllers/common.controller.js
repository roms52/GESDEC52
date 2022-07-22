const server = require("../../server");
const db = require("../models");
const Sequelize = db.sequelize;

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

        if (Lien) {
            eval(Model).findAll({
                raw: true,
                include: eval(Lien),                
                attributes: eval(Attr)})
            .then(rows=>{
                       rowData = rows; 

            if(!Col)
                for( let key in eval(Model).rawAttributes ){
                    columnDef.push({"field": key})
                }
            else {
                columnDef = (eval(Col))
                
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

        else {

            eval(Model).findAll({
                raw: true,
                attributes: eval(Attr)})
            .then(rows=>{
                       rowData = rows; 

            if(!Col)
                for( let key in eval(Model).rawAttributes ){
                    columnDef.push({"field": key})
                }
            else {
                columnDef = (eval(Col))
                
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


exports.allOccur = (req, res) => {
 
        table = Models.find(el => el === req.params.table);
        const Occ = req.query.occ;

                const Model = 'db.' + table;
        
                 eval(Model).findAll({
                    raw: true,
                    attributes: eval(Occ)})
                    .then(data=>{
                                
                        res.send(data);

                    })
                    .catch(err=>{
                        res.status(500).send({
                            message:
                            err.message || "erreur survenue"
                        });
                    });

    }
    