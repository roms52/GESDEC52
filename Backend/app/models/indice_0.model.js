module.exports = (sequelize, Sequelize) => {
    const Indice_0 = sequelize.define("indice_0", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            nom_indice: {
                type: Sequelize.STRING
            },
            valeur_indice: {
                type: Sequelize.DOUBLE
            },
            date_debut: {
                type: Sequelize.DATEONLY
            }
        },
        {
            schema : 'preprod',
            tableName : 'indice_0',
            timestamps: false
        });

        return Indice_0;
  };