import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {
  Form,
  Button,
  Alert,
  Container,
  Card,
  Spinner
} from "react-bootstrap";

function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .matches(
          /^[a-zA-Z0-9_]+$/,
          "Username can only contain letters, numbers, and underscores"
        ),
      fullName: Yup.string().required("Full name is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = await api.post("/auth/signup", values);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      } catch (error) {
        setStatus({
          error: error.response?.data.message || "Signup failed",
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
            maxWidth: "480px",
            borderRadius: "16px",
            backgroundColor: "#ffffff",
          }}
        >
          <h2
            className="text-center mb-4 fw-bold"
            style={{ color: "#0d6efd", fontSize: "1.8rem" }}
          >
            Create Account
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
                placeholder="Choose a username"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.fullName && !!formik.errors.fullName}
                placeholder="Enter your full name"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && !!formik.errors.password}
                placeholder="Create a password"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.confirmPassword &&
                  !!formik.errors.confirmPassword
                }
                placeholder="Re-enter your password"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.confirmPassword}
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
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default Signup;
