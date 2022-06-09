module.exports = (sequelize, Sequelize) => {
    const Prestataire = sequelize.define("prestataire", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            nom_prestataire: {
                type: Sequelize.STRING
            }
        },
        {
            schema : 'preprod',
            tableName : 'prestataire',
            timestamps: false
        });

        return Prestataire;
  };