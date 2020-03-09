const quote = (sequelize, DataTypes) => {
	const Quote = sequelize.define('quote', {
		text: DataTypes.STRING,
	});
	Quote.associate = models => {
		Quote.belongsTo(models.Article);
	};
	return Quote;
};
export default quote;