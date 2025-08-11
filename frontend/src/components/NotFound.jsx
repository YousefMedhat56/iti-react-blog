import { Container, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <Container className="text-center mt-5">
            <Alert variant="warning" className="p-5 rounded shadow-sm">
                <h1>😢 404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <Button as={Link} to="/" variant="primary" className="mt-3">
                    Go Home
                </Button>
            </Alert>
        </Container>
    );
}

export default NotFound;
