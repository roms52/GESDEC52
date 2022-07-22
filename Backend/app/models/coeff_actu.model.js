module.exports = (sequelize, Sequelize) => {
    const Coeff_actu = sequelize.define("coeff_actu", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            req_maj_valeur: {
                type: Sequelize.TEXT
            }
        },
        {
            schema : 'preprod',
            tableName : 'coeff_actu',
            timestamps: false
        });

        return Coeff_actu;
  };