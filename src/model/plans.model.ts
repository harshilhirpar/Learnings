import { Sequelize, DataTypes} from 'sequelize'
import DB from '../DB'

const Plans = DB.sequelize.define('Plans', {
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    duration_months:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Plans