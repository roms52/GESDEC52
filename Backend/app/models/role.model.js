module.exports = (sequelize, Sequelize) => {

    const Role = sequelize.define("roles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    },
    {
        schema : 'preprod',
        timestamps: false
    });

    return Role;
  };