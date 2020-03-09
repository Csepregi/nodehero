const article = (sequelize, DataTypes) => {
	const Article = sequelize.define('article', {
		link: {
			type: DataTypes.STRING,
			unique: true,
		},
	});

	Article.associate = models => {
		Article.hasMany(models.Quote, { onDelete: 'CASCADE' });
	};

	return Article;
};

export default article;