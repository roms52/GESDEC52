module.exports = (sequelize, Sequelize) => {
    const Type_tarif_pn = sequelize.define("type_tarif_pn", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            tarif_typ: {
                type: Sequelize.STRING
            }
        },
        {
            schema : 'preprod',
            tableName : 'type_tarif_pn',
            timestamps: false
        });

        return Type_tarif_pn;
  };