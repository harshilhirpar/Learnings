import { Request, Response, NextFunction } from "express"
import Plans from "../model/plans.model"

const addPlan = async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, duration_months } = req.body
    const isPlanExist = await Plans.findOne({
        where: { name }
    })
    // If plan is Already exists give error
    if (isPlanExist) {
        res.status(400).send({
            message: 'Plan Already Exist'
        })
    }
    if (!isPlanExist) {
        const newPlan = await Plans.create({
            name,
            description,
            price,
            duration_months
        })
        res.status(201).send({
            message: 'Plan Created',
            data: newPlan
        })
    }
}

const getAllPlans = async (req: Request, res: Response, next: NextFunction) => {
    const plans = await Plans.findAll()
    res.status(200).send({
        message: "All Plans are Here",
        data: plans
    })
}

export default { addPlan, getAllPlans }