import User from "../model/user.model";

const createTables = async () => {
    await User.sync({ force: false, logging:false })
    console.log("Table User Created")
}


export default createTables;
