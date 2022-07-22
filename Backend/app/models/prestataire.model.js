module.exports = (sequelize, Sequelize) => {
    const Prestataire = sequelize.define("prestataire", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nom_prestataire: {
                type: Sequelize.STRING
            },
            adresse: {
                type: Sequelize.STRING
            },
            cpostal: {
                type: Sequelize.STRING
            },
            ville: {
                type: Sequelize.STRING
            },
            num_tel: {
                type: Sequelize.STRING
            },
            num_fax: {
                type: Sequelize.STRING
            },
            mail: {
                type: Sequelize.STRING
            },
            rib: {
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