module.exports = (sequelize, Sequelize) => {
    const Unite = sequelize.define("unite", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nom_unite: {
                type: Sequelize.STRING
            }
        },
        {
            schema : 'preprod',
            tableName : 'unite',
            timestamps: false
        });

        return Unite;
  };