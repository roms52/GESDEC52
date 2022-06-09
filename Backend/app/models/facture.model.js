module.exports = (sequelize, Sequelize) => {
    const Facture = sequelize.define("facture", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            num_facture: {
                type: Sequelize.STRING
            },
            date_reception: {
                type: Sequelize.DATEONLY
            },
            date_paiement: {
                type: Sequelize.DATEONLY
            },
            num_bordereau: {
                type: Sequelize.STRING
            }
        },
        {
            schema : 'preprod',
            tableName : 'facture',
            timestamps: false
        });

        return Facture;
  };