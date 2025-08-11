import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../api';

function ArticleForm({ onSubmit, initialValues = { title: '', content: '' }, submitLabel = "Create Article", onCancel }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            content: Yup.string().required('Content is required'),
        }),
        onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
            try {
                await onSubmit(values);
                setStatus({ success: 'Article saved successfully' });
                if (!onCancel) resetForm();
            } catch (error) {
                setStatus({ error: 'Failed to save article' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            {formik.status?.success && <Alert variant="success">{formik.status.success}</Alert>}
            {formik.status?.error && <Alert variant="danger">{formik.status.error}</Alert>}
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.title && formik.errors.title}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    name="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.content && formik.errors.content}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.content}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" disabled={formik.isSubmitting}>
                {submitLabel}
            </Button>
            {onCancel && (
                <Button variant="secondary" className="ms-2" onClick={onCancel}>
                    Cancel
                </Button>
            )}
        </Form>
    );
}

export default ArticleForm;