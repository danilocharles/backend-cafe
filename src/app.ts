import express, { Application } from "express";
import cors from "cors"

import dotenv from "dotenv";
dotenv.config({path: resolve(__dirname, '../.env')});
import cookieParser from "cookie-parser";


import userRouter from "./routes/user.routes";
import tokenRouter from "./routes/token.routes"
import itemRouter from "./routes/item.routes"
import cartRouter from "./routes/cart.routes"
import orderRouter from "./routes/order.routes"

import { resolve } from "path";


//* Ativar quando for fazer o deploy
const whiteList = [
	'http://localhost:5173/',
]

const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true
}

class App {
	app: Application;
	constructor() {
		this.app = express();
		this.middlewares();
		this.routes();
	}

	middlewares(): void {
		this.app.use(cors(corsOptions))
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
		this.app.use(cookieParser());
	}

	routes(): void {
		this.app.use("/register/", userRouter);
		this.app.use("/login/", tokenRouter)
		this.app.use("/product/", itemRouter)
		this.app.use("/cart/", cartRouter)
		this.app.use("/order/", orderRouter)
	}
}
export default new App().app;
