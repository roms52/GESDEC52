module.exports = (sequelize, Sequelize) => {
    const Tableau_bord = sequelize.define("tableau_bord", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            date_prestation: {
                type: Sequelize.DATEONLY
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
            }

        },
        {
            schema : 'preprod',
            tableName : 'tableau_bord',
            timestamps: false
        });

        return Tableau_bord;
  };