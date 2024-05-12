import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import User from "../model/user.model"
import password_encrypter from "../utils/password_encrypter"
import dotenv from 'dotenv'
import dates from "../utils/dates"
import Plans from "../model/plans.model"
import { DateTime } from "luxon"
dotenv.config()

const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body
    const isUserExist = await User.findOne({ where: { email } })
    if (isUserExist) {
        res.status(400).send({
            message: 'User Already Exist'
        })
    }
    if (!isUserExist) {
        const hashedPassword: string = password_encrypter.encryptPassword(password)
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })
        res.status(201).send({
            message: 'User Created',
            data: newUser
        })
    }
}

const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const findUser: any = await User.findOne({ where: { email } })
    if (findUser) {
        //Check Password
        const passwordToCheckWith = findUser.password
        const isPasswordMatch: boolean = password_encrypter.comparePassword(password, passwordToCheckWith)
        if (isPasswordMatch) {
            //Do Login
            const token = jwt.sign({ id: findUser.id }, process.env.JWT || 'Harshil')
            res.status(200).send({
                message: 'Login Successful',
                token
            })
        }
        if (!isPasswordMatch) {
            res.status(400).send({
                message: 'Email or Password are Incorrect'
            })
        }
    }
    if (!findUser) {
        res.status(404).send({
            message: 'User Not Found'
        })
    }
}

const removeUserController = async (req: Request, res: Response, next: NextFunction) => {

}

const subscribeUserToPlan = async (req: Request, res: Response, next: NextFunction) => {
    // User Must be logged in before taking the plan
    // For that the route must be protected
    // Because the route is protected I can get the user details
    // We need Plan details
    // Store current data as a plan start date
    // Calculate the end date and add it as a end data in user table.
    const user: any = req.user
    const { planName } = req.body
    const plan: any = await Plans.findOne({
        where: { name: planName}
    })
    if(!plan){
        res.status(404).send({
            message: "Something went wrong"
        })
    }
    if(plan){
        const {duration_months} = plan
        const planStartDate: DateTime = dates.getCurrentTime()
        const planEndDate = dates.calculatePlanEndDate(duration_months)
        const planId = plan.id
        const updatedUser = await User.update({
            planId,
            plan_start_date: planStartDate,
            plan_end_date: planEndDate
        }, {
            where: {
                id: user.id
            }
        })
        res.status(200).send({
            message: "Subscribed Successfully",
            updatedUser
        })
    }
}

export default { createUserController, removeUserController, loginUserController, subscribeUserToPlan }
