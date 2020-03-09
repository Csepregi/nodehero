import { Router } from 'express';
const getArticles = require('../blogScraper/index')
import models, { sequelize } from '../models';
const router = Router();
//const articlesRouter = Router();

// router.get('/', async (req, res) => {
// 	const articles = await req.context.models.Article.findAll();
// 	return res.send(articles);
// });

// router.get('/:articleId', async (req, res) => {
// 	const article = await req.context.models.Article.findByPk(
// 		req.params.userId,
// 	);
// 	return res.send(article);
// });

router.get('/:number', async (req, res) => {
	let requestPageNumber = req.params.number
	//let requestPageNumber = 2
	let result = []
	for (let i = 1; i <= requestPageNumber; i++) {
		result.push(await getArticles(`https://blog.risingstack.com/page/${i}/`));
		//result[i] = await getArticles(`https://blog.risingstack.com/page/${i}/`)
	}

	result.flat().map((r) => {
		models.Article.create(
			{
				link: r.title,
				quotes: [
					{
						text: r.smallTitles[0]
					}
				],
			},
			{
				include: [models.Quote],
			},
		);
	})
	console.log(result)
	res.json(result);
});



export default router;