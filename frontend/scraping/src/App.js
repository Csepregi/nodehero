import React, { useState } from 'react';
import articleService from './services/articles'
import Article from './components/Article';
import ArticleForm from './components/Articleform';

const App = () => {
  const [articles, setArticles] = useState([])
  const [articlenumber, setArticleNumber] = useState('')
  console.log(articles)

  const getArticle = (event) => {
    event.preventDefault()

    articleService
      .getAll(articlenumber)
      .then(initialArticles => setArticles(initialArticles))
    setArticleNumber('')
  }

  const onChange = (event) => {
    setArticleNumber(event.target.value)
  }

  const rows = () => articles.flat().map((article) =>
    <Article article={article} key={article.title} />
  )

  return (
    <div>
      <h2>articles</h2>
      <ArticleForm onSubmit={getArticle} value={articlenumber} handleChange={onChange} />
      <ul>
        {rows()}
      </ul>
    </div>
  )
}



export default App;
