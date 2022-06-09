module.exports = (sequelize, Sequelize) => {
    const Type_marche = sequelize.define("type_marche", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            marche_typ: {
                type: Sequelize.STRING
            }
        },
        {
            schema : 'preprod',
            tableName : 'type_marche',
            timestamps: false
        });

        return Type_marche;
  };