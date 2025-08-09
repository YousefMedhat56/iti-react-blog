import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import ArticleForm from '../components/ArticleForm';
import { Container, Button, ListGroup, Spinner, Alert } from 'react-bootstrap';

function Dashboard() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [editingArticle, setEditingArticle] = useState(null);

    const handleEdit = (article) => {
        setEditingArticle(article);
    };

    const handleEditSubmit = async (values) => {
        await api.put(`/articles/${editingArticle._id}`, values);
        setEditingArticle(null);
        navigate('/');

    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return;
        }
        api.get(`/articles/author/${user.id}`)
            .then(response => {
                setArticles(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to load articles');
                setLoading(false);
            });
    }, [navigate]);

    const handleCreate = async values => {
        const response = await api.post('/articles', values);
        setArticles([...articles, response.data]);
    };



    const handleDelete = async id => {
        await api.delete(`/articles/${id}`);
        setArticles(articles.filter(a => a._id !== id));
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container>
            <h1>Dashboard</h1>
            <h3>{'Create New Article'}</h3>
            {editingArticle ? (
                <ArticleForm
                    submitLabel="Edit Article"
                    onSubmit={handleEditSubmit}
                    initialValues={{
                        title: editingArticle.title,
                        content: editingArticle.content,
                    }}
                />
            ) : (<ArticleForm onSubmit={handleCreate} />
            )}
            <h3 className="mt-4">Your Articles</h3>
            <ListGroup>
                {articles.length === 0 && <p>No articles found</p>}

                {articles.map(article => (
                    <ListGroup.Item key={article._id}>
                        <div className="d-flex justify-content-between">
                            <span>{article.title}</span>
                            <div>
                                <Button
                                    variant="link"
                                    className="text-primary"
                                    onClick={() => handleEdit(article)}
                                >
                                    Edit
                                </Button>
                                <Button variant="link" className="text-danger" onClick={() => handleDelete(article._id)}>Delete</Button>
                            </div>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default Dashboard;