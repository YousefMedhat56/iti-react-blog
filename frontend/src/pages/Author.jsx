import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import ArticleCard from '../components/ArticleCard';
import { Container, Spinner, Alert } from 'react-bootstrap';
import NotFound from '../components/NotFound';

function Author() {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            api.get(`/author/${id}`),
            api.get(`/articles/author/${id}`),
        ])
            .then(([userResponse, articlesResponse]) => {
                setAuthor(userResponse.data);
                setArticles(articlesResponse.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Author not found');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Spinner animation="border" />;
    if (error) return <NotFound />;

    return (
        <Container>
            <h1>{author.fullName}'s Profile</h1>
            <h3>Published Articles</h3>
            {articles.length === 0 && <p>No articles found</p>}
            {articles.map(article => (
                <ArticleCard key={article._id} article={article} />
            ))}
        </Container>
    );
}

export default Author;