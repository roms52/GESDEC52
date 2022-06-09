module.exports = (sequelize, Sequelize) => {
    const Dechetterie = sequelize.define("dechetterie", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            nom_dechetterie: {
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