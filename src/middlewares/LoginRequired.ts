import jwt from "jsonwebtoken";
import { prisma } from "../services/prisma";
import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const { authorization } = req.cookies;
		
		if (!authorization) {
            res.redirect('/')
			return res.status(401).json({
				errors: ["Login required"]
			});
		}

        let data: any
        if(process.env.TOKEN_SECRET){
            data = jwt.verify(authorization, process.env.TOKEN_SECRET);
        }
		

		const { id, email } = data;

		const user = await prisma.usuario.findUnique({
			where: {
				id,
				email
			}
		});

		if (!user) {
            res.redirect('/')
			return res.status(401).json({
				errors: ["Token expirado ou inválido"]
			});
		}

		req.body.userId = id;
		return next();
	} catch {
        res.redirect('/')
		return res.status(401).json({
			errors: ["Token expirado ou inválido"]
		});
	}
};