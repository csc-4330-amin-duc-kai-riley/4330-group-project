// frontend/authentication/sign-in/index.js
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import BasicLayout from "frontend/authentication/components/BasicLayout";
import { useAuth } from "context/AuthContext";

function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [notification, setNotification] = useState({ open: false, message: "", color: "info" });
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.username, formData.password);

    if (!result.success) {
      setNotification({
        open: true,
        message: result.message || "Login failed. Please check your credentials.",
        color: "error",
      });
    }
  };

  return (
    <BasicLayout>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Welcome Back
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Sign in to continue rating today&#39;s styles
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="username"
                label="Username"
                variant="standard"
                fullWidth
                value={formData.username}
                onChange={handleChange}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="password"
                label="Password"
                variant="standard"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                required
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&#39;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign Up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>

      <MDSnackbar
        color={notification.color}
        icon="notifications"
        title="Authentication"
        content={notification.message}
        open={notification.open}
        close={() => setNotification({ ...notification, open: false })}
        autoHideDuration={3000}
      />
    </BasicLayout>
  );
}

export default SignIn;