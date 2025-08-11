import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container, Card, Spinner } from "react-bootstrap";
import api from "../api";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = await api.post("/auth/login", values);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/dashboard");
      } catch (error) {
        setStatus({
          error: error.response?.data.message || "Login failed",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Container>
        <Card
          className="p-4 shadow-lg mx-auto border-0"
          style={{
            maxWidth: "420px",
            borderRadius: "16px",
            backgroundColor: "#ffffff",
          }}
        >
          <h2
            className="text-center mb-4 fw-bold"
            style={{ color: "#0d6efd", fontSize: "1.8rem" }}
          >
            Login
          </h2>

          <Form onSubmit={formik.handleSubmit}>
            {formik.status?.error && (
              <Alert variant="danger" className="text-center">
                {formik.status.error}
              </Alert>
            )}

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.username && !!formik.errors.username}
                placeholder="Enter your username"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && !!formik.errors.password}
                placeholder="Enter your password"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-100 fw-semibold"
              style={{
                backgroundColor: "#0d6efd",
                border: "none",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              {formik.isSubmitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
