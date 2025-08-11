import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import ArticleForm from "../components/ArticleForm";
import {
  Container,
  Button,
  ListGroup,
  Spinner,
  Alert,
  Card,
} from "react-bootstrap";

function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (article) => {
    setEditingArticle(article);
    window.scrollTo({ top: 0, behavior: "smooth" }); // ينزل لفوق للفورم
  };

  const handleEditSubmit = async (values) => {
    await api.put(`/articles/${editingArticle._id}`, values);
    setEditingArticle(null);
    navigate("/");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }
    api
      .get(`/articles/author/${user.id}`)
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load articles");
        setLoading(false);
      });
  }, [navigate]);

  const handleCreate = async (values) => {
    const response = await api.post("/articles", values);
    setArticles([...articles, response.data]);
  };

  const handleDelete = async (id) => {
    await api.delete(`/articles/${id}`);
    setArticles(articles.filter((a) => a._id !== id));
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="my-5">
      <h1 className="fw-bold mb-4">Dashboard</h1>

      {/* Create/Edit Article */}
      <Card className="shadow-sm border-0 rounded-4 mb-4 p-4">
        <h3 className="mb-3">
          {editingArticle ? "Edit Article" : "Create New Article"}
        </h3>
        <ArticleForm
          submitLabel={editingArticle ? "Update Article" : "Create Article"}
          onSubmit={editingArticle ? handleEditSubmit : handleCreate}
          initialValues={
            editingArticle
              ? {
                  title: editingArticle.title,
                  content: editingArticle.content,
                }
              : undefined
          }
        />
      </Card>

      {/* Your Articles */}
      <h3 className="fw-bold mb-3">Your Articles</h3>
      {articles.length === 0 ? (
        <p className="text-muted">No articles found.</p>
      ) : (
        <ListGroup className="shadow-sm rounded-3 overflow-hidden">
          {articles.map((article) => (
            <ListGroup.Item
              key={article._id}
              className="d-flex justify-content-between align-items-center"
            >
              <span className="fw-semibold">{article.title}</span>
              <div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(article)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(article._id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default Dashboard;
