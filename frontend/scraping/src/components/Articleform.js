import React from 'react'

const ArticleForm = ({ onSubmit, value, handleChange }) => {

	return (
		<form onSubmit={onSubmit}>
			<div>
				<input
					value={value}
					onChange={handleChange}
				/>
			</div>
			<button type="submit">get it</button>
		</form>
	)
}

export default ArticleForm