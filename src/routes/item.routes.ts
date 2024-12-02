import {Router} from "express"
import ItemController from '../controllers/ItemController'
const router: Router = Router()

router.get('/:id', ItemController.index)

export default router