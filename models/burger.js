module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define('Burger', {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Burger.associate = function(models) {
        Burger.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Burger;
};