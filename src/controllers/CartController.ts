import { Request, Response } from "express";
import { prisma } from "../services/prisma";

class CartController {
	async store(req: Request, res: Response): Promise<any> {
		try {
			const { id } = req.body;

		
			const cart = await prisma.carrinho.findMany({
				where: {
					id_usuario: req.body.userId
				}
			})
	
			

			const itemCarrinho = await prisma.itemCarrinho.create({
				data: {
					quantidade: 1,
					id_item: Number(id),
                    id_carrinho: cart[0].id 
				}
			});

            return res.status(200).json(itemCarrinho)
		} catch (e) {
			return res.status(400).json({
				e
			});
		}
	}

	async show(req: Request, res: Response): Promise<any> {
		try {
			const cart = await prisma.carrinho.findMany({
				where: {
					id_usuario: req.body.userId
				}
			})
	
			const itemsCart = await prisma.itemCarrinho.findMany({
				where: {
					id_carrinho: cart[0].id
				}
			})

			return res.status(200).json(itemsCart)
		} catch (e) {
			return res.send(e);
		}
	}

	async delete(req: Request, res: Response): Promise<any> {
		try {
			const id = Number(req.params.id)

			const deleteItem = await prisma.itemCarrinho.deleteMany({
                where: {
                    id
                }
            })

			return res.status(200).json(deleteItem) 
		} catch (e) {
			return res.send(e);
		}
	}
}
export default new CartController();
