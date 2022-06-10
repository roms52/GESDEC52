const server = require("../../server");
const db = require("../models");
const Models = 
['type_marche', 'type_cout', 'type_tarif_pn', 'indice', 'indice_0',
'coeff_actu', 'marche', 'bpu', 'tableau_bord', 'prestataire',
'dechetterie', 'flux', 'prestation', 'facture'];


// Récupère rows et attributes de la table en params
exports.allDatasOfTable = (req, res) => {
    
table = Models.find(el => el === req.params.table);
columnDef = [];
rowData =[];

    if (table != undefined){   
        const Model = 'db.' + table;
        dataReturn = [[]]
            eval(Model).findAll({raw: true})
            .then(rows=>{
                       rowData = rows; 

                for( let key in eval(Model).rawAttributes ){
                    columnDef.push({"field": key})
                }
                
                dataReturn = [rowData,columnDef]
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
