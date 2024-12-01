import { useAuth } from "context/AuthContext";
import { motion } from "framer-motion";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function About() {
  const { isAuthenticated } = useAuth();

  // Animation variants from Landing
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
                  JORTS, which stands for &quot;Join Others, Rate Today&#39;s Styles&quot; is a
                  unique social media platform combining the fun of sharing your daily outfits with
                  the interactive twist of &quot;Would You Rather.&quot;
                </MDTypography>
                <MDTypography variant="body2" color="text" mb={2}>
                  Users are prompted to upload a daily outfit photo (&quot;fit pic&quot;) and then
                  participate in a game-like environment where they vote on other users&#39;
                  outfits.
                </MDTypography>

                <MDTypography variant="body2" color="text" mb={2}>
                  The platform enables users to share details about their outfits, add reactions,
                  and receive feedback from others, fostering a fashion-focused community.
                </MDTypography>

                {/* Features Section */}
                <MDBox
                  mt={8}
                  component={motion.div}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  <MDTypography variant="h4" mb={4}>
                    Features
                  </MDTypography>
                  <Grid container spacing={4}>
                    {[
                      {
                        title: "Daily Uploads",
                        description: "Share your outfit each day and build your style portfolio",
                        icon: "📸",
                      },
                      {
                        title: "Interactive Voting",
                        description: "Vote on outfit matchups and see what the community thinks",
                        icon: "🗳️",
                      },
                      {
                        title: "Style Community",
                        description: "Connect with others and get inspired by different styles",
                        icon: "👥",
                      },
                    ].map((feature, index) => (
                      <Grid item xs={12} md={4} key={feature.title}>
                        <MDBox
                          p={3}
                          borderRadius="lg"
                          sx={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                            backdropFilter: "blur(10px)",
                            transition: "transform 0.3s",
                            "&:hover": {
                              transform: "translateY(-10px)",
                            },
                          }}
                        >
                          <MDTypography variant="h1" color="info" mb={2}>
                            {feature.icon}
                          </MDTypography>
                          <MDTypography variant="h5" mb={2}>
                            {feature.title}
                          </MDTypography>
                          <MDTypography variant="body2" color="text">
                            {feature.description}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                    ))}
                  </Grid>
                </MDBox>

                {/* How It Works Section */}
                <MDBox mt={8} component={motion.div} variants={fadeIn}>
                  <MDTypography variant="h4" mb={4}>
                    How It Works
                  </MDTypography>
                  <Grid container spacing={4}>
                    {[
                      {
                        step: "1",
                        title: "Upload Your Fit",
                        description: "Take a photo of your daily outfit and share it",
                        icon: "📷",
                      },
                      {
                        step: "2",
                        title: "Vote on Pairs",
                        description: "Compare outfits and pick your favorites",
                        icon: "🗳️",
                      },
                      {
                        step: "3",
                        title: "Get Feedback",
                        description: "Receive votes and comments on your outfits",
                        icon: "💬",
                      },
                      {
                        step: "4",
                        title: "Level Up",
                        description: "Build your style and grow your following",
                        icon: "⭐",
                      },
                    ].map((step, index) => (
                      <Grid item xs={12} md={3} key={step.step}>
                        <MDBox
                          p={3}
                          borderRadius="lg"
                          sx={{
                            background:
                              "linear-gradient(195deg, rgba(66, 66, 74, 0.8), rgba(25, 25, 25, 0.8))",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            transition: "transform 0.3s",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                        >
                          <MDBox
                            mb={2}
                            width="40px"
                            height="40px"
                            borderRadius="50%"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ background: "linear-gradient(195deg, #49a3f1, #1A73E8)" }}
                          >
                            <MDTypography variant="h5" color="white">
                              {step.step}
                            </MDTypography>
                          </MDBox>
                          <MDTypography variant="h5" color="white" mb={1}>
                            {step.title}
                          </MDTypography>
                          <MDTypography variant="body2" color="text" mb={2}>
                            {step.description}
                          </MDTypography>
                          <MDTypography variant="h3">{step.icon}</MDTypography>
                        </MDBox>
                      </Grid>
                    ))}
                  </Grid>
                </MDBox>
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
