import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function About() {
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
                  About JORTS
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDTypography variant="h4" mb={3}>
                  Welcome to JORTS!
                </MDTypography>

                <MDTypography variant="body2" color="text" mb={2}>
                  JORTS, which stands for &quot;Join Others, Rate Today&apos;s Styles&quot; is a
                  unique social media platform combining the fun of sharing your daily outfits with
                  the interactive twist of &quot;Would You Rather.&quot;
                </MDTypography>

                <MDTypography variant="body2" color="text" mb={2}>
                  Users are prompted to upload a daily outfit photo (&quot;fit pic&quot;) and then
                  participate in a game-like environment where they vote on other users&apos;
                  outfits.
                </MDTypography>

                <MDTypography variant="body2" color="text" mb={2}>
                  The platform enables users to share details about their outfits, add reactions,
                  and receive feedback from others, fostering a fashion-focused community.
                </MDTypography>

                <MDTypography variant="body2" color="text" mb={2}>
                  Vote for your favorite outfits and leave comments to share your thoughts with the
                  community. Engage with the fashion community, share your looks, and find
                  inspiration. We aim to make fashion fun, engaging, and interactive for everyone.
                </MDTypography>

                {/* Feature highlights section remains the same */}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default About;
