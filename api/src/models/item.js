import { DataTypes } from'sequelize';

export default (sequelize) => {
    sequelize.define("Item", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        img: {
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
