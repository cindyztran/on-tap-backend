import { Router as routerBase } from "express";
import Beer from '../models/BeerModel.js'

const router = routerBase()

router.get('/', async (req, res) => {
    try {
        res.json(await Beer.find({}));

    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try { 
        res.json(await Beer.findByIdAndRemove(req.params.id))

    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        res.json(await Beer.findByIdAndUpdate(req.params.id, req.body, { new: true }));

    } catch (error) { 
        res.status(400).json(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const { createdById } = req.body;
        createdById = req.user.uid;
        res.json(await Beer.create(req.body));

    } catch (error) {
        res.status(400).json(error);
    }
});

export default router;
