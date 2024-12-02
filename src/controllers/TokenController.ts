import { Request, Response } from "express";
import { prisma } from "../services/prisma";
import { passwordValidator } from "../validations/passwordValidator";
import jwt from "jsonwebtoken";
import { User } from "../validations/userValidator";

class TokenController {
	async store(req: Request, res: Response): Promise<any> {
		try {
			const { email = "", password = ""}: User = req.body;

			if (!email || !password) {
				return res.status(401).json({
					errors: ["Credenciais inválidas"]
				});
			}

			const user = await prisma.usuario.findUnique({
				where: { email }
			});

			if (!user) {
				return res.status(401).json({
					errors: ["Usuário não existe"]
				});
			}

			if (!(await passwordValidator(password, user.senha))) {
				return res.status(401).json({
					errors: ["Senha inválida"]
				});
			}

			let token;
			const { id } = user;
			if (process.env.TOKEN_SECRET) {
				token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
					expiresIn: process.env.TOKEN_EXPIRATION
				});
			}

			res.cookie("authorization", token, {
				maxAge: 604800000,
				httpOnly: true,
				secure: false
			});
			return res.status(200).json({
				token
			});
		} catch (e) {
			return res.status(400).json({
				e
			});
		}
	}

	async verify(req: Request, res: Response): Promise<any> {
		try {
			const { authorization } = req.cookies;

			if (!authorization) {
				return res.send(false);
			}

			let data: any;
			if (process.env.TOKEN_SECRET) {
				data = jwt.verify(authorization, process.env.TOKEN_SECRET);
			}

			let { id, email } = data;

			const user = await prisma.usuario.findUnique({
				where: {
					id,
					email
				}
			});

			if (!user) {
				return res.send(false);
			}

			return res.send(true);
		} catch {
			return res.send(false);
		}
	}

	async delete(req: Request, res: Response): Promise<any> {
		try {
			res.clearCookie("authorization");
			res.send({ apagado: true });
		} catch (e) {
			return res.send(e);
		}
	}
}
export default new TokenController();
