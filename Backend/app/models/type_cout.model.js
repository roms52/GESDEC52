module.exports = (sequelize, Sequelize) => {
    const Type_cout = sequelize.define("type_cout", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            cout_typ: {
                type: Sequelize.STRING
            }
        },
        {
            schema : 'preprod',
            tableName : 'type_cout',
            timestamps: false
        });

        return Type_cout;
  };