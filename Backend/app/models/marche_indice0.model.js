module.exports = (sequelize, Sequelize) => {
    const Marche_Indice0 = sequelize.define("marche_indice0", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_marche: {
            type: Sequelize.INTEGER,
        },
        id_indice: {
            type: Sequelize.INTEGER,
        }
        },
        {
            schema : 'preprod',
            tableName : 'marche_indice0',
            timestamps: false
        });

        return Marche_Indice0;
  };