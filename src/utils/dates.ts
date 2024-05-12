import { DateTime } from "luxon";

const getCurrentTime = () => {
    return DateTime.now()
}

const calculatePlanEndDate = (duration: number) => {
    const currentDate = getCurrentTime()
    const planEndDate = currentDate.plus({months: duration})
    return planEndDate 
}

export default { getCurrentTime, calculatePlanEndDate }