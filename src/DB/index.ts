import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('test', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres'
})

const connectDB = async () => {
    try {
        await sequelize.authenticate()
    } catch (error) {
        console.log(error)
    }
}

export default {connectDB, sequelize};