import bcrypt from 'bcryptjs'

const encryptPassword = (password: string) => {
    var salt: string = bcrypt.genSaltSync(10);
    var hashedpassword: string = bcrypt.hashSync(password, salt)
    return hashedpassword
}

const comparePassword = (enteredPassword: string, password: string) => {
    const result: boolean = bcrypt.compareSync(enteredPassword, password)
    return result
}

export default {encryptPassword, comparePassword}