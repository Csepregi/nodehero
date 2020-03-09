import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
	const quotes = await req.context.models.Qoute.findAll();
	return res.send(quotes);
});

router.get('/:messageId', async (req, res) => {
	const quote = await req.context.models.Qoute.findByPk(
		req.params.quote,
	);
	return res.send(quote);
});


export default router;