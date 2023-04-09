import { Router as expressRouter } from 'express'
import General from './general.routes.js'
import Beer from './beer.routes.js'
const router = expressRouter()

router.use('/', General)
router.use('/beers', Beer)

export default router;