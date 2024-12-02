import {Router} from "express"
import UserController from '../controllers/TokenController'
const router: Router = Router()

router.post('/', UserController.store)
router.get('/', UserController.verify)
router.delete('/', UserController.delete)

export default router