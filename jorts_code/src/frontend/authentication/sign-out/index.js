import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";

function SignOut() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/landing");
  };

  return (
    <MDBox p={2}>
      <MDButton
        fullWidth
        variant="gradient"
        color="error"
        onClick={handleSignOut}
        startIcon={<Icon>logout</Icon>}
      >
        Sign Out
      </MDButton>
    </MDBox>
  );
}

export default SignOut;
