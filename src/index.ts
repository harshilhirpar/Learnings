import express from 'express'
import DB from './DB';
import db from './DB/db_init';
import userRoute from './routes/user.routes';
import plansRoutes from './routes/plans.routes';
import tweetsRoutes from './routes/tweets.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import path from 'path';

const app = express()

app.use(express.json())
app.use([userRoute, plansRoutes, tweetsRoutes])

// Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Reading Images
app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename
    res.sendFile(path.join(__dirname, '../uploads', filename))
})

// Listing on PORT 3000
app.listen(3000, async () => {
    await DB.connectDB();
    console.log("DB CONNECTED")
    db.sequelize.sync({ force: false, logging: false })
    console.log("TABLES CREATED")
    console.log('Server is on')
})

