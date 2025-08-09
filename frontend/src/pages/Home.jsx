import { useEffect, useState } from 'react';
import api from '../api';
import ArticleCard from '../components/ArticleCard';
import { Container, Spinner } from 'react-bootstrap';

function Home() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/articles')
            .then(response => {
                setArticles(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <Spinner animation="border" />;

    return (
        <Container>
            <h1>All Articles</h1>
            {articles.length === 0 && <p>No articles yet</p>}

            {articles.map(article => (
                <ArticleCard key={article._id} article={article} />
            ))}
        </Container>
    );
}

export default Home;