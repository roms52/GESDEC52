module.exports = (sequelize, Sequelize) => {
    const Tableau_bord = sequelize.define("tableau_bord", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            date_prestation: {
                type: Sequelize.DATEONLY
            },
            mois_prestation: {
                type: Sequelize.INTEGER
            },
            annee_prestation: {
                type: Sequelize.INTEGER
            },
            id_bpu: {
                type: Sequelize.INTEGER
            },
            id_marche: {
                type: Sequelize.INTEGER
            },
            id_typ_tarif_pn: {
                type: Sequelize.INTEGER
            },
            id_prestataire: {
                type: Sequelize.INTEGER
            },
            id_dechetterie: {
                type: Sequelize.INTEGER
            },
            id_flux: {
                type: Sequelize.INTEGER
            },
            id_prestation: {
                type: Sequelize.INTEGER
            },
            quantite: {
                type: Sequelize.DOUBLE
            },
            id_unite: {
                type: Sequelize.INTEGER
            },
            tarif_pn: {
                type: Sequelize.DOUBLE
            },
            cout_pn: {
                type: Sequelize.DOUBLE
            },
            tarif_p0: {
                type: Sequelize.DOUBLE
            },
            cout_p0: {
                type: Sequelize.DOUBLE
            },
            controle_quantite: {
                type: Sequelize.BOOLEAN
            },
            controle_prix: {
                type: Sequelize.BOOLEAN
            },
            tva: {
                type: Sequelize.DOUBLE
            },
            id_facture: {
                type: Sequelize.INTEGER
            },
            id_dechetterie_init: {
                type: Sequelize.INTEGER
            },
            id_flux_init: {
                type: Sequelize.INTEGER
            },
            quantite_init: {
                type: Sequelize.DOUBLE
            }

        },
        {
            schema : 'preprod',
            tableName : 'tableau_bord',
            timestamps: false
        });

        return Tableau_bord;
  };