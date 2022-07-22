module.exports = (sequelize, Sequelize) => {
    const Dechetterie = sequelize.define("dechetterie", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nom_dechetterie: {
                type: Sequelize.STRING
            },
            type_dechetterie: {
                type: Sequelize.STRING
            }
        },
        {
            schema : 'preprod',
            tableName : 'dechetterie',
            timestamps: false
        });

        return Dechetterie;
  };