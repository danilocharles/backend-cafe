import bcrypt from "bcrypt"

export const passwordValidator = (password: string, password_hash: string) => {
    return bcrypt.compare(password, password_hash)
}

