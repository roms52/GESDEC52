module.exports = (sequelize, Sequelize) => {
    const Marche = sequelize.define("marche", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            id_typ_marche: {
                type: Sequelize.INTEGER
            },
            montant_max: {
                type: Sequelize.INTEGER
            },
            date_debut: {
                type: Sequelize.DATEONLY
            },
            date_fin: {
                type: Sequelize.DATEONLY
            },
            id_typ_cout: {
                type: Sequelize.INTEGER
            },
            id_coeff_actu: {
                type: Sequelize.INTEGER
            },
            date_remise_offre: {
                type: Sequelize.DATEONLY
            },
            id_typ_tarif_pn: {
                type: Sequelize.INTEGER
            },
            commentaire: {
                type: Sequelize.STRING
            },
            inactif: {
                type: Sequelize.BOOLEAN
            }

        },
        {
            schema : 'preprod',
            tableName : 'marche',
            timestamps: false
        });

        return Marche;
  };