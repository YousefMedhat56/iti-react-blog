import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { Container, Spinner, Alert } from 'react-bootstrap';
import NotFound from '../components/NotFound';

function Article() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        api.get(`/articles/${id}`)
            .then(response => {

                setArticle(response.data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setError('Article not found');
            });
    }, [id]);

    if (loading) return <Spinner animation="border" />;
    if (error) return <NotFound />;

    const getArticleDate = (dateString) => {
        const articleDate = new Date(dateString);

        const year = articleDate.getFullYear();
        const month = articleDate.getMonth() + 1;
        const day = articleDate.getDate();

        return `${year}-${month}-${day}`;
    }
    return (
        <Container>
            <h1>{article.title}</h1>
            <h5>
                By <Link to={`/author/${article.author._id}`}>{article.author.fullName}</Link>
            </h5>
            <span className=' text-muted'>{getArticleDate(article.createdAt)}</span>
            <p className='mt-2'>{article.content}</p>
        </Container>
    );
}

export default Article;