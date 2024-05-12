import express from 'express'
import DB from './DB';
import createTables from './DB/db_init';
import userRoute from './routes/user.routes';

const app = express()

app.use(express.json())
app.use(userRoute)

app.listen(3000, async () => {
    await DB.connectDB();
    await createTables();
    console.log('Server is on')
})
