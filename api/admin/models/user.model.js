module.exports = (sequelize, Sequelize) => {
    let users = sequelize.define('users', {
        _id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        mobile_no: { type: Sequelize.INTEGER },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING },
        first_name: { type: Sequelize.STRING },
        last_name: { type: Sequelize.STRING },
        role: { type: Sequelize.ENUM('admin', 'coach', 'user') },
        staus: { type: Sequelize.BOOLEAN },
        otp: { type: Sequelize.STRING },
        otp_verify: { type: Sequelize.BOOLEAN }
    }, {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        tableName: 'users'
    });
    return users;
}