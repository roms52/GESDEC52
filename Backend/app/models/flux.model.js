module.exports = (sequelize, Sequelize) => {
    const Flux = sequelize.define("flux", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            nom_flux: {
                type: Sequelize.STRING
            },
            sous_flux: {
                type: Sequelize.STRING
            }
        },
        {
            schema : 'preprod',
            tableName : 'flux',
            timestamps: false
        });

        return Flux;
  };