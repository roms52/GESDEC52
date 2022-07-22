module.exports = (sequelize, Sequelize) => {
    const Prestation = sequelize.define("prestation", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nom_prestation: {
                type: Sequelize.STRING
            }
        },
        {
            schema : 'preprod',
            tableName : 'prestation',
            timestamps: false
        });

        return Prestation;
  };