import { DataTypes } from'sequelize';

export default (sequelize) => {
    sequelize.define("Landing", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          info_header:{
            type: DataTypes.STRING,
            allowNull: false,
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
        enable:{
          type: DataTypes.BOOLEAN,
          defaultValue:true
      } 
    },{timestamps: false});
};