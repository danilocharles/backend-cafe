import { Request, Response } from "express";
import { userValidator, User } from "../validations/userValidator";
import { prisma } from "../services/prisma";
import bcrypt from "bcrypt";

class UserController {
	async store(req: Request, res: Response): Promise<any> {
		try {
           
			await userValidator.validate(req.body);

			const { name, email, password, cpf }: User = req.body;
			const cpfLimpo = cpf.replace(/\D/g, "");

			const userExist = await prisma.usuario.findMany({
				where: {
					OR: [
						{
							email
						},
						{
							cpf: Number(cpfLimpo)
						}
					]
				}
			});

			if (userExist.length !== 0) {
				return res.status(400).json({
					errors: ["Usuário já existe"]
				});
			}

			const hashPassword = await bcrypt.hash(password, 10);

			const user = await prisma.usuario.create({
				data: {
					nome: name,
					senha: hashPassword,
					cpf: Number(cpfLimpo),
					email: email
				},
				select: {
					nome: true,
					email: true,
					id: true
				}
			});
			await prisma.carrinho.create({
                data: {
                    id_usuario: user.id 
                }
            })
			return res.status(200).json(user);
		} catch (e) {
			res.status(400).json({ e });
		}
	}
}

export default new UserController();
