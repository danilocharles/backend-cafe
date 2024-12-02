import { prisma } from "../services/prisma";
import { Request, Response } from "express";

class OrderController {
	async store(req: Request, res: Response): Promise<any> {
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


            const order = await prisma.pedido.create({
                data: {
                    data: Number(new Date()),
                    status: 'Buscar na loja',
                    id_cliente: req.body.userId,
                }, select: {
                    id: true
                }
            })

            for (const itemCart of itemsCart) {
                await prisma.itemPedido.create({
                    data: {
                        quantidade: itemCart.quantidade,
                        id_item: itemCart.id_item,
                        id_pedido: order.id,
                    }
                })
            }

           await prisma.itemCarrinho.deleteMany({
                where: {
                    id_carrinho: cart[0].id
                }
            })
            return res.status(200).json(order)

		} catch (e) {
			return res.status(400).json({
				e
			});
		}
	}

    async show(req: Request, res: Response): Promise<any> {
		try {
            const orders = await prisma.pedido.findMany({
                where: {
                    id_cliente: req.body.userId
                }
            })

			return res.status(200).json(orders)
		} catch (e) {
			return res.send(e);
		}
	}
    async index(req: Request, res: Response): Promise<any> {
		try {
            const { id } = req.params
            const order = await prisma.pedido.findUnique({
                where: {
                    id: Number(id),
                    id_cliente: req.body.userId
                }
            })

			return res.status(200).json(order)
		} catch (e) {
			return res.send(e);
		}
	}
    async update(req: Request, res: Response): Promise<any> {
		try {
            const { id } = req.body
            console.log(id)
            const order = await prisma.pedido.update({
                where: {
                    id: Number(id),
                    id_cliente: req.body.userId
                },
                data: {
                    status: 'Finalizado',
                    data_termino: Number(new Date())
                }
            })

			return res.status(200).json(order)
		} catch (e) {
			return res.send(e);
		}
	}


}
export default new OrderController();
