import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import ArticleCard from "../components/ArticleCard";
import { Container, Spinner, Card, Row, Col } from "react-bootstrap";
import NotFound from "../components/NotFound";

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
      .catch(() => {
        setError("Author not found");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) return <NotFound />;

  return (
    <Container className="my-5">
      {/* Author Info */}
      <Card className="shadow-sm border-0 rounded-4 mb-4 p-4">
        <Card.Body>
          <Card.Title className="display-6 fw-bold mb-2">
            {author.fullName}
          </Card.Title>
          <Card.Subtitle className="text-muted fs-5">
            Author Profile
          </Card.Subtitle>
        </Card.Body>
      </Card>

      {/* Articles */}
      <h3 className="fw-bold mb-4">Published Articles</h3>
      {articles.length === 0 ? (
        <p className="text-muted">No articles found.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {articles.map((article) => (
            <Col key={article._id}>
              <ArticleCard article={article} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Author;
