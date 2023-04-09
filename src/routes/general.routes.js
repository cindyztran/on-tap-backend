import { Router as routerBase } from "express";
import general from '../services/general.service.js'

const router = routerBase()

router.get('/', async (req, res, next) => {
    try {
        const data = await general.get();
        res.json(data);
      } catch (err) {
        return next(err);
      }
});

export default router;