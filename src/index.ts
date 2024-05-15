import express from 'express'
import DB from './DB';
import db from './DB/db_init';
import userRoute from './routes/user.routes';
import plansRoutes from './routes/plans.routes';
import tweetsRoutes from './routes/tweets.routes';

const app = express()

app.use(express.json())
app.use([userRoute, plansRoutes, tweetsRoutes])

const isWorking = false

if (isWorking) {
    console.log("Change")
}

if (!isWorking) {
    // Listing on PORT 3000
    app.listen(3000, async () => {
        await DB.connectDB();
        console.log("DB CONNECTED")
        // await db_init.createTables();
        db.sequelize.sync({ force: false, logging: false })
        console.log("TABLES CREATED")
        // db_init.defineRelations();
        console.log("RELATION ADDED")
        console.log('Server is on')
    })
}
