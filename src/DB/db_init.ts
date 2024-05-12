import User from "../model/user.model";
import Plans from "../model/plans.model";

const force = false
const createTables = async () => {
    await User.sync({ force, logging: false })
    console.log("Table User Created")
    await Plans.sync({ force, logging: false })
    console.log("Table Plans Created")
}

export default createTables;
