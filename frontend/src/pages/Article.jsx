import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import { Container, Spinner, Alert, Card } from "react-bootstrap";
import NotFound from "../components/NotFound";

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/articles/${id}`)
      .then((response) => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Article not found");
      });
  }, [id]);

  const getFormattedDate = (dateString) => {
    const articleDate = new Date(dateString);
    return articleDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) return <NotFound />;

  return (
    <Container className="my-5">
      <Card className="shadow-lg border-0 rounded-4 p-4">
        <Card.Body>
          <Card.Title className="display-5 fw-bold mb-3">
            {article.title}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            By{" "}
            <Link to={`/author/${article.author._id}`} className="fw-semibold">
              {article.author.fullName}
            </Link>
          </Card.Subtitle>
          <small className="text-secondary">
            {getFormattedDate(article.createdAt)}
          </small>
          <hr />
          <Card.Text className="fs-5 lh-lg mt-3">{article.content}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Article;
