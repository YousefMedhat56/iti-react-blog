import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function ArticleCard({ article }) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <Link to={`/article/${article._id}`}>{article.title}</Link>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    By <Link to={`/author/${article.author._id}`}>{article.author.fullName}</Link>
                </Card.Subtitle>
                <Card.Text>{article.content.substring(0, 100)}...</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ArticleCard;