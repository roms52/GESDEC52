const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);



const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user =  require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.user_role = require("../models/user_role.model.js")(sequelize, Sequelize);
db.type_marche = require("../models/type_marche.model.js")(sequelize, Sequelize);
db.type_cout = require("../models/type_cout.model.js")(sequelize, Sequelize);
db.type_tarif_pn = require("../models/type_tarif_pn.model.js")(sequelize, Sequelize);
db.indice = require("../models/indice.model.js")(sequelize, Sequelize);
db.marche_indice0 = require("./marche_indice0.model.js")(sequelize, Sequelize);
db.coeff_actu = require("../models/coeff_actu.model.js")(sequelize, Sequelize);
db.marche = require("../models/marche.model.js")(sequelize, Sequelize);
db.bpu = require("../models/bpu.model.js")(sequelize, Sequelize);
db.tableau_bord = require("../models/tableau_bord.model.js")(sequelize, Sequelize);
db.prestataire = require("../models/prestataire.model.js")(sequelize, Sequelize);
db.dechetterie = require("../models/dechetterie.model.js")(sequelize, Sequelize);
db.flux = require("../models/flux.model.js")(sequelize, Sequelize);
db.prestation = require("../models/prestation.model.js")(sequelize, Sequelize);
db.facture = require("../models/facture.model.js")(sequelize, Sequelize);
db.unite = require("../models/unite.model.js")(sequelize, Sequelize);

// Initialisation des relations un à plusieurs

        // Table User et Role
              db.role.belongsToMany(db.user, {
                through: db.user_role,
                foreignKey: 'id_role'
              });
              db.user.belongsToMany(db.role, {
                through: db.user_role,
                foreignKey: 'id_user'
              });

              db.user.hasMany(db.user_role,{
                foreignKey: 'id_user'
              });
              db.user_role.belongsTo(db.user,{
                foreignKey: 'id_user'
              });

              db.role.hasMany(db.user_role,{
                foreignKey: 'id_role'
              });
              db.user_role.belongsTo(db.role,{
                foreignKey: 'id_role'
              });

        // Table Marché avec toutes les listes liées
            db.type_marche.hasMany(db.marche,{
                foreignKey: 'id_typ_marche'
            });
            db.marche.belongsTo(db.type_marche,{
                foreignKey: 'id_typ_marche'
            });

            db.type_cout.hasMany(db.marche,{
                foreignKey: 'id_typ_cout'
            });
            db.marche.belongsTo(db.type_cout,{
                foreignKey: 'id_typ_cout'
            });

            db.type_tarif_pn.hasMany(db.marche,{
                foreignKey: 'id_typ_tarif_pn'
            });
            db.marche.belongsTo(db.type_tarif_pn,{
                foreignKey: 'id_typ_tarif_pn'
            });

            db.coeff_actu.hasMany(db.marche,{
                foreignKey: 'id_coeff_actu'
            });
            db.marche.belongsTo(db.coeff_actu,{
                foreignKey: 'id_coeff_actu'
            });

            // Table croisée pour connaitre indice0 du marché
            db.marche.belongsToMany(db.indice,{
                through: db.marche_indice0, foreignKey: 'id_marche' 
            });
            db.indice.belongsToMany(db.marche,{
                through: db.marche_indice0, foreignKey: 'id_indice' 
            });

            db.marche_indice0.belongsTo(db.marche,{
                foreignKey: 'id_marche'
            });

            db.marche_indice0.belongsTo(db.indice,{
                foreignKey: 'id_indice'
            });

        // Tables BPU et tableau de bord avec toutes les listes liées
            db.marche.hasMany(db.bpu,{
                foreignKey: 'id_marche'
            });
            db.bpu.belongsTo(db.marche,{
                foreignKey: 'id_marche'
            });

            db.marche.hasMany(db.tableau_bord,{
                foreignKey: 'id_marche'
            });
            db.tableau_bord.belongsTo(db.marche,{
                foreignKey: 'id_marche'
            });



            db.prestataire.hasMany(db.bpu,{
                foreignKey: 'id_prestataire'
            });
            db.bpu.belongsTo(db.prestataire,{
                foreignKey: 'id_prestataire'
            });

            db.prestataire.hasMany(db.tableau_bord,{
                foreignKey: 'id_prestataire'
            });
            db.tableau_bord.belongsTo(db.prestataire,{
                foreignKey: 'id_prestataire'
            });



            db.dechetterie.hasMany(db.bpu,{
                foreignKey: 'id_dechetterie'
            });
            db.bpu.belongsTo(db.dechetterie,{
                foreignKey: 'id_dechetterie'
            });

            db.dechetterie.hasMany(db.tableau_bord,{
                foreignKey: 'id_dechetterie'
            });
            db.tableau_bord.belongsTo(db.dechetterie,{
                foreignKey: 'id_dechetterie'
            });



            db.flux.hasMany(db.bpu,{
                foreignKey: 'id_flux'
            });
            db.bpu.belongsTo(db.flux,{
                foreignKey: 'id_flux'
            });

            db.flux.hasMany(db.tableau_bord,{
                foreignKey: 'id_flux'
            });
            db.tableau_bord.belongsTo(db.flux,{
                foreignKey: 'id_flux'
            });



            db.prestation.hasMany(db.bpu,{
                foreignKey: 'id_prestation'
            });
            db.bpu.belongsTo(db.prestation,{
                foreignKey: 'id_prestation'
            });

            db.prestation.hasMany(db.tableau_bord,{
                foreignKey: 'id_prestation'
            });
            db.tableau_bord.belongsTo(db.prestation,{
                foreignKey: 'id_prestation'
            });



                // Listes liées 2 fois à BPU ou tableau de bord (utilisation d'alias)

            db.marche.hasMany(db.bpu,{
                foreignKey: 'id_marche_lie'
            });
            db.bpu.belongsTo(db.marche,{
                as: 'marche_lie',
                foreignKey: 'id_marche_lie'
            });




            db.dechetterie.hasMany(db.tableau_bord,{
                foreignKey: 'id_dechetterie_init'
            });
            db.tableau_bord.belongsTo(db.dechetterie,{
                as: 'dechetterie_init',
                foreignKey: 'id_dechetterie_init'
            });

           


            db.flux.hasMany(db.tableau_bord,{
                foreignKey: 'id_flux_init'
            });
            db.tableau_bord.belongsTo(db.flux,{
                as: 'flux_init',
                foreignKey: 'id_flux_init'
            });


        // Table tableau de bord et facture + unite + typ_tarif_pn
            db.facture.hasMany(db.tableau_bord,{
                foreignKey: 'id_facture'
            });
            db.tableau_bord.belongsTo(db.facture,{
                foreignKey: 'id_facture'
            });

            db.unite.hasMany(db.tableau_bord,{
                foreignKey: 'id_unite'
            });
            db.tableau_bord.belongsTo(db.unite,{
                foreignKey: 'id_unite'
            });

            db.type_tarif_pn.hasMany(db.tableau_bord,{
                foreignKey: 'id_typ_tarif_pn'
            });
            db.tableau_bord.belongsTo(db.type_tarif_pn,{
                foreignKey: 'id_typ_tarif_pn'
            });

        

        // Table tableau de bord et bpu
             db.bpu.hasMany(db.tableau_bord,{
                foreignKey: 'id_bpu'
            });
            db.tableau_bord.belongsTo(db.bpu,{
                foreignKey: 'id_bpu'
            });


module.exports = db; 