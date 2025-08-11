import { Container, Card, Row, Col } from 'react-bootstrap';

const categories = [
  {
    id: 1,
    title: 'Sports',
    description: 'Latest news and articles about sports.',
    image: '/images/sports.jpg'
  },
  {
    id: 2,
    title: 'Politics',
    description: 'Insights and opinions on political events.',
    image: '/images/politics.jpg'
  },
  {
    id: 3,
    title: 'Cooking',
    description: 'Delicious recipes and cooking tips.',
    image: '/images/cooking.jpg'
  }
];

function Home() {
  return (
    <Container>
      <h1 className="mb-4">Categories</h1>
      <Row>
        {categories.map(cat => (
          <Col key={cat.id} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={cat.image} alt={cat.title} />
              <Card.Body>
                <Card.Title>{cat.title}</Card.Title>
                <Card.Text>{cat.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
