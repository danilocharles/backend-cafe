import {Router} from "express"
import OrderController from '../controllers/OrderController'
import LoginRequired from "../middlewares/LoginRequired"
const router: Router = Router()

router.post('/', LoginRequired, OrderController.store)
router.get('/', LoginRequired, OrderController.show)
router.get('/:id', LoginRequired, OrderController.index)
router.put('/', LoginRequired, OrderController.update)

export default router