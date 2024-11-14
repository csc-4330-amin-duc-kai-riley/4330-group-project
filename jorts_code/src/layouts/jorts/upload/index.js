import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDSnackbar from "components/MDSnackbar";

// Layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Upload() {
  const [image, setImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    caption: "",
    items: [],
  });
  const [newItem, setNewItem] = useState({
    brand: "",
    item: "",
    link: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
          setStep(2);
          setUploadSuccess(true);
        };
        reader.readAsDataURL(file);
      } else {
        setNotification(true);
      }
    }
  };

  const addClothingItem = () => {
    if (newItem.brand && newItem.item) {
      setFormData({
        ...formData,
        items: [...formData.items, newItem],
      });
      setNewItem({ brand: "", item: "", link: "" });
    }
  };

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    setNotification(true);
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
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Upload Your Daily Outfit
                </MDTypography>
              </MDBox>

              <MDBox pt={4} pb={3} px={3}>
                {step === 1 ? (
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
                        "&:hover": { borderColor: "info.main" },
                      }}
                      onClick={() => document.getElementById("fileInput").click()}
                    >
                      <input
                        type="file"
                        id="fileInput"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <MDBox textAlign="center">
                        <Icon fontSize="large" color="action">
                          cloud_upload
                        </Icon>
                        <MDTypography variant="h6" mt={1}>
                          Click or drag to upload your outfit photo
                        </MDTypography>
                        <MDTypography variant="body2" color="text">
                          Supported formats: JPG, PNG, GIF
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                ) : (
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <MDBox
                        component="img"
                        src={image}
                        alt="Upload preview"
                        borderRadius="lg"
                        shadow="md"
                        width="100%"
                        height="auto"
                        maxHeight="500px"
                        sx={{ objectFit: "cover" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDBox component="form" role="form">
                        <MDBox mb={2}>
                          <MDInput
                            multiline
                            rows={3}
                            label="Caption"
                            fullWidth
                            value={formData.caption}
                            onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                          />
                        </MDBox>

                        <MDBox mb={2}>
                          <MDTypography variant="h6" mb={1}>
                            Add Clothing Items
                          </MDTypography>
                          <MDBox mb={2}>
                            <MDInput
                              label="Brand"
                              fullWidth
                              value={newItem.brand}
                              onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
                            />
                          </MDBox>
                          <MDBox mb={2}>
                            <MDInput
                              label="Item Name"
                              fullWidth
                              value={newItem.item}
                              onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
                            />
                          </MDBox>
                          <MDBox mb={2}>
                            <MDInput
                              label="Link (optional)"
                              fullWidth
                              value={newItem.link}
                              onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                            />
                          </MDBox>
                          <MDButton
                            variant="gradient"
                            color="info"
                            fullWidth
                            onClick={addClothingItem}
                          >
                            Add Item
                          </MDButton>
                        </MDBox>

                        <MDBox mb={2}>
                          {formData.items.map((item, index) => (
                            <MDBox
                              key={index}
                              p={2}
                              mb={1}
                              borderRadius="lg"
                              sx={{ backgroundColor: "grey.100" }}
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <MDTypography variant="button">
                                {item.brand} - {item.item}
                              </MDTypography>
                              <MDButton
                                variant="text"
                                color="error"
                                onClick={() => removeItem(index)}
                              >
                                <Icon>delete</Icon>
                              </MDButton>
                            </MDBox>
                          ))}
                        </MDBox>

                        <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                          Post Outfit
                        </MDButton>
                      </MDBox>
                    </Grid>
                  </Grid>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <MDSnackbar
        color={uploadSuccess ? "success" : "error"}
        icon={uploadSuccess ? "check" : "warning"}
        title="JORTS"
        content={
          uploadSuccess ? "Image uploaded successfully!" : "Please upload a valid image file"
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
