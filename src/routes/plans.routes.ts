import express from 'express'
import planControllers from '../controllers/plan.controllers'

const plansRoutes = express.Router()


plansRoutes.post('/api/v1/subscription/add',planControllers.addPlan)
plansRoutes.get('/api/v1/subscription/', planControllers.getAllPlans)

export default plansRoutes