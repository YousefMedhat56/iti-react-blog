import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Form, Button, Alert, Container } from 'react-bootstrap';

function Login() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                const response = await api.post('/auth/login', values);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/dashboard');
            } catch (error) {
                setStatus({ error: error.response?.data.message || 'Login failed' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Container className="col-md-6">
            <h1>Login</h1>
            <Form onSubmit={formik.handleSubmit}>
                {formik.status?.error && <Alert variant="danger">{formik.status.error}</Alert>}
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.username && formik.errors.username}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.password && formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" disabled={formik.isSubmitting}>
                    Login
                </Button>
            </Form>
        </Container>
    );
}

export default Login;