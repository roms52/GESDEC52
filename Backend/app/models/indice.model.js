module.exports = (sequelize, Sequelize) => {
    const Indice = sequelize.define("indice", {
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
            tableName : 'indice',
            timestamps: false
        });

        return Indice;
  };