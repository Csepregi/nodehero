const cheerio = require('cheerio')
const request = require('request-promise')

const mainUrl = 'https://blog.risingstack.com/'

const fetchData = async (siteUrl) => {
	const result = await request(siteUrl);
	return cheerio.load(result);
};

const getArticles = async (siteUrl) => {
	const articles = [];
	const $ = await fetchData(siteUrl)
	$('.post-header').each((index, element) => {
		const title = $(element)
			.children()
			.first()
			.text()
		const link = mainUrl + $(element)
			.children()
			.children()
			.attr('href')
		articles[index] = { title, link }
	})

	const data = await Promise.all(articles.map(async (article) => {
		try {
			const bloghtml = await request(article.link);
			const $ = cheerio.load(bloghtml)

			const titles = $('h1, h2, h3, h4')
			const smallTitles = titles.map((i, title) => {
				return $(title).text()
			}).get()
			return {
				title: article.link,
				smallTitles
			}
		} catch (error) {
		}
	}))
	return data
}

module.exports = getArticles