import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Form, Button, Alert, Container } from 'react-bootstrap';

function Signup() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required').matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
            fullName: Yup.string().required('Full name is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                const response = await api.post('/auth/signup', values);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/dashboard');
            } catch (error) {
                setStatus({ error: error.response?.data.message || 'Signup failed' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Container className="col-md-6">
            <h1>Signup</h1>
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
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.fullName && formik.errors.fullName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.fullName}</Form.Control.Feedback>
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
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" disabled={formik.isSubmitting}>
                    Signup
                </Button>
            </Form>
        </Container>
    );
}

export default Signup;