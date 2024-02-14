const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        mobile: { type: DataTypes.STRING, allowNull: true },
        gender: { type: DataTypes.STRING, allowNull: true },
        dob: { type: DataTypes.DATE, allowNull: true },
        address: { type: DataTypes.STRING, allowNull: true },
        city: { type: DataTypes.STRING, allowNull: true },
        pincode: { type: DataTypes.STRING, allowNull: true },
        hash: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}