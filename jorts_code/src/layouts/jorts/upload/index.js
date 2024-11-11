import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Upload() {
  const [image, setImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dailyUpload, setDailyUpload] = useState(false);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    const lastUploadDate = localStorage.getItem("lastUploadDate");
    const today = new Date().toLocaleDateString();
    if (lastUploadDate === today) {
      setDailyUpload(true);
    }
  }, []);

  const handleImageUpload = (e) => {
    if (!dailyUpload) {
      const file = e.target.files[0];
      if (file) {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);
            setUploadSuccess(true);
            setDailyUpload(true);
            localStorage.setItem("lastUploadDate", new Date().toLocaleDateString());
            setNotification(true);
          };
          reader.readAsDataURL(file);
        } else {
          alert("Please upload an image file");
        }
      }
    } else {
      setNotification(true);
    }
  };

  const closeNotification = () => setNotification(false);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Upload Your Daily Outfit
                </MDTypography>
              </MDBox>

              <MDBox pt={4} pb={3} px={3}>
                {!uploadSuccess ? (
                  <MDBox
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                  >
                    <MDBox
                      borderRadius="lg"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                      minHeight="200px"
                      bgColor="grey-100"
                      sx={{
                        border: "2px dashed #ccc",
                        cursor: "pointer",
                        "&:hover": {
                          borderColor: "info.main",
                        },
                      }}
                      onClick={() => !dailyUpload && document.getElementById("fileInput").click()}
                    >
                      <input
                        type="file"
                        id="fileInput"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={dailyUpload}
                      />
                      <MDBox textAlign="center">
                        <Icon fontSize="large" color="action">
                          cloud_upload
                        </Icon>
                        <MDTypography variant="h6" mt={1}>
                          {dailyUpload
                            ? "You've already uploaded today's outfit!"
                            : "Click or drag to upload your outfit photo"}
                        </MDTypography>
                        <MDTypography variant="body2" color="text">
                          Supported formats: JPG, PNG, GIF
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                ) : (
                  <MDBox display="flex" flexDirection="column" alignItems="center">
                    <MDBox
                      component="img"
                      src={image}
                      alt="Uploaded outfit"
                      borderRadius="lg"
                      shadow="md"
                      width="auto"
                      height="300px"
                      sx={{ objectFit: "cover" }}
                    />
                    <MDBox mt={3} width="100%" maxWidth="500px">
                      <MDButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        onClick={() => {
                          setImage(null);
                          setUploadSuccess(false);
                          localStorage.removeItem("lastUploadDate");
                          setDailyUpload(false);
                        }}
                      >
                        Upload a Different Photo
                      </MDButton>
                    </MDBox>
                  </MDBox>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <MDSnackbar
        color={dailyUpload && !uploadSuccess ? "warning" : "success"}
        icon="notifications"
        title="JORTS"
        content={
          dailyUpload && !uploadSuccess
            ? "You can only upload one outfit per day!"
            : "Your outfit has been uploaded successfully!"
        }
        open={notification}
        onClose={closeNotification}
        close={closeNotification}
        autoHideDuration={3000}
      />

      <Footer />
    </DashboardLayout>
  );
}

export default Upload;
