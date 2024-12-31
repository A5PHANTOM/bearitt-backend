'use strict';
import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: {
        type: DataTypes.ENUM,
        values: ['Male', 'Female'],
        allowNull: false,
        validate: {
            isIn: {
                args: [['Male', 'Female']],
                msg: 'Gender must be Male, Female.',
            },
        },
    },
    mobileNo: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Must be a valid email address.',
            },
        },
    },
    password: DataTypes.STRING,
  }, {});