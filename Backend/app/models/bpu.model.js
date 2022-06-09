module.exports = (sequelize, Sequelize) => {
    const Bpu = sequelize.define("bpu", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            id_marche: {
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
            tarif_p0: {
                type: Sequelize.DOUBLE
            },
            tva: {
                type: Sequelize.DOUBLE
            },

        },
        {
            schema : 'preprod',
            tableName : 'bpu',
            timestamps: false
        });

        return Bpu;
  };