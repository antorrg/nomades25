import { DataTypes } from'sequelize';

export default (sequelize) => {
    sequelize.define("Media", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          type: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          text: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
        enable:{
          type: DataTypes.BOOLEAN,
          defaultValue:true
      } 
    },{timestamps: false});
};
