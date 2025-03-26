import { DataTypes } from'sequelize';

export default (sequelize) => {
    sequelize.define("About", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          image: {
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
         },
         imgShow:{
          type: DataTypes.BOOLEAN,
          defaultValue:true
         }  
    },{timestamps: false});
};
