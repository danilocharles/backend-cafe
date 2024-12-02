import {Router} from "express"
import CartController from '../controllers/CartController'
import LoginRequired from "../middlewares/LoginRequired"
const router: Router = Router()

router.post('/', LoginRequired, CartController.store)
router.get('/', LoginRequired, CartController.show)
router.delete('/:id', LoginRequired, CartController.delete)

export default router