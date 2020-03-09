import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import flash from 'connect-flash'
import passport from 'passport'
import session from 'express-session'
const RedisStore = require('connect-redis')(session)

import models, { sequelize } from './models';
import routes from './routes';

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	store: new RedisStore({
		url: config.redisStore.url
	}),
	secret: config.redisStore.secret,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(async (req, res, next) => {
	req.context = {
		models,
	};
	next();
});

// Routes

//app.use('/session', routes.session);
app.use('/articles', routes.article);
//app.use('/articles', articlesRouter);
//app.use('/articles/hello', routes.article)
//app.use('/quotes', routes.quote);

// Start

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
	if (eraseDatabaseOnSync) {
		createArticlesWithQuotes();
	}

	app.listen(process.env.PORT, () =>
		console.log(`Example app listening on port ${process.env.PORT}!`),
	);
});

const createArticlesWithQuotes = async () => {
	await models.Article.create(
		{
			link: '/update-node-js-latest-version/',
			quotes: [
				{
					text: 'share this post',
				},
			],
		},
		{
			include: [models.Quote],
		},
	);

	await models.Article.create(
		{
			link: '/mastering-async-await-in-nodejs/',
			quotes: [
				{
					text: 'Learn More Node.js from RisingStack',
				},
				{
					text: 'Changelog for Node 13.0.0 (Current)',
				},
			],
		},
		{
			include: [models.Quote],
		},
	);
};