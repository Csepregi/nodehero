import React, { useState } from 'react'

const Article = ({ article }) => {
	console.log(article)
	const [showDetails, setShowDetails] = useState(false);

	const visible = { display: showDetails ? '' : 'none' }

	const toggleDetails = () => {
		setShowDetails(!showDetails);
	};

	return (
		<div>
			<li key={article.title} onClick={toggleDetails} className='article'>{article.title}
				{article.smallTitles.map((small, i) =>
					<p style={visible} key={i} className="togglableContent">{small}</p>
				)}
			</li>
		</div>
	)
}

export default Article