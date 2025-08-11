import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function ArticleCard({ article }) {
    return (
        <Card className="mb-4 shadow-sm border-0 rounded-3 overflow-hidden">
            {article.image && (
                <Card.Img
                    variant="top"
                    src={article.image}
                    alt={article.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
            )}
            <Card.Body>
                <Card.Title className="fw-bold">
                    <Link className="text-decoration-none text-dark" to={`/article/${article._id}`}>
                        {article.title}
                    </Link>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted small">
                    By{' '}
                    <Link className="text-decoration-none" to={`/author/${article.author._id}`}>
                        {article.author.fullName}
                    </Link>
                </Card.Subtitle>
                <Card.Text>{article.content.substring(0, 100)}...</Card.Text>
                <Button as={Link} to={`/article/${article._id}`} variant="primary" size="sm">
                    Read More
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ArticleCard;
