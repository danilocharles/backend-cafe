import { Request, Response } from "express";
import { prisma } from "../services/prisma";
class ItemController {
	async index(req: Request, res: Response): Promise<any> {
		try {
			const { id } = req.params;

            const item = await prisma.item.findUnique({
                where: {
                    id: Number(id)
                }
            })

            res.status(200).json(
                item
            )
		} catch (e) {
			return res.status(400).json({
				e
			});
		}
	}

}
export default new ItemController();
