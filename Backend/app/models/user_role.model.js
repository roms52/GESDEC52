module.exports = (sequelize, Sequelize) => {
    const User_Role = sequelize.define("user_role", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        id_user: {
            type: Sequelize.INTEGER,
        },
        id_role: {
            type: Sequelize.INTEGER,
        }
        },
        {
            schema : 'preprod',
            tableName : 'user_role',
            timestamps: false
        });

        return User_Role;
  };