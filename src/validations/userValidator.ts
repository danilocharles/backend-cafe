import * as yup from "yup"

export const userValidator = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
    cpf: yup.string().required().min(11)
})

export type User = {
    name: string,
    email: string,
    password: string,
    cpf: string
}