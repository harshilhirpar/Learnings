import { Sequelize, DataTypes} from 'sequelize'
import DB from '../DB'

const User = DB.sequelize.define('User', {
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    planId: {
        type: DataTypes.UUID,
        allowNull: true
    },
    plan_start_date:{
        type: DataTypes.DATE,
        allowNull: true
    },
    plan_end_date:{
        type: DataTypes.DATE,
        allowNull: true
    }
})

export default User;