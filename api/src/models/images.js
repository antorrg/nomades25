import { DataTypes } from'sequelize';

export default (sequelize) => {
    sequelize.define("Image", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    },{timestamps: false});
};
