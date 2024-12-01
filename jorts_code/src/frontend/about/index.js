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
                py={4}
                px={3}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h4" color="white" fontWeight="medium">
                  About JORTS
                </MDTypography>
              </MDBox>
              <MDBox pt={5} pb={4} px={4}>
                <MDTypography
                  variant="h3"
                  mb={4}
                  color="black"
                  fontWeight="bold"
                  sx={{ fontSize: "2.5rem" }}
                >
                  Welcome to JORTS!
                </MDTypography>

                <MDTypography
                  variant="body1"
                  color="black"
                  mb={3}
                  sx={{
                    fontSize: "1.2rem",
                    lineHeight: 1.8,
                    letterSpacing: "0.02em",
                  }}
                >
                  JORTS, which stands for &quot;Join Others, Rate Today&#39;s Styles&quot; is a
                  unique social media platform combining the fun of sharing your daily outfits with
                  the interactive twist of &quot;Would You Rather.&quot;
                </MDTypography>
                <MDTypography
                  variant="body1"
                  color="black"
                  mb={3}
                  sx={{
                    fontSize: "1.2rem",
                    lineHeight: 1.8,
                    letterSpacing: "0.02em",
                  }}
                >
                  Users are prompted to upload a daily outfit photo (&quot;fit pic&quot;) and then
                  participate in a game-like environment where they vote on other users&#39;
                  outfits.
                </MDTypography>

                <MDTypography
                  variant="body1"
                  color="black"
                  mb={3}
                  sx={{
                    fontSize: "1.2rem",
                    lineHeight: 1.8,
                    letterSpacing: "0.02em",
                  }}
                >
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
                  <MDTypography
                    variant="h3"
                    mb={4}
                    color="white"
                    fontWeight="bold"
                    sx={{ fontSize: "2rem" }}
                  >
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
                    ].map((feature) => (
                      <Grid item xs={12} md={4} key={feature.title}>
                        <MDBox
                          p={4}
                          borderRadius="xl"
                          sx={{
                            background:
                              "linear-gradient(195deg, rgba(66, 66, 74, 0.95), rgba(25, 25, 25, 0.95))",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                            transition: "transform 0.3s",
                            "&:hover": {
                              transform: "translateY(-10px)",
                            },
                          }}
                        >
                          <MDTypography variant="h2" color="info" mb={3}>
                            {feature.icon}
                          </MDTypography>
                          <MDTypography
                            variant="h5"
                            color="white"
                            mb={2}
                            fontWeight="medium"
                            sx={{ fontSize: "1.5rem" }}
                          >
                            {feature.title}
                          </MDTypography>
                          <MDTypography
                            variant="body1"
                            color="light"
                            sx={{
                              fontSize: "1.1rem",
                              lineHeight: 1.6,
                            }}
                          >
                            {feature.description}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                    ))}
                  </Grid>
                </MDBox>

                {/* How It Works Section */}
                <MDBox mt={8} component={motion.div} variants={fadeIn}>
                  <MDTypography
                    variant="h3"
                    mb={4}
                    color="white"
                    fontWeight="bold"
                    sx={{ fontSize: "2rem" }}
                  >
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
                    ].map((step) => (
                      <Grid item xs={12} md={3} key={step.step}>
                        <MDBox
                          p={4}
                          borderRadius="xl"
                          sx={{
                            background:
                              "linear-gradient(195deg, rgba(66, 66, 74, 0.95), rgba(25, 25, 25, 0.95))",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                            transition: "transform 0.3s",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                        >
                          <MDBox
                            mb={3}
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                              background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                              boxShadow: "0 4px 10px rgba(26,115,232,0.3)",
                            }}
                          >
                            <MDTypography variant="h5" color="white" sx={{ fontSize: "1.5rem" }}>
                              {step.step}
                            </MDTypography>
                          </MDBox>
                          <MDTypography
                            variant="h5"
                            color="white"
                            mb={2}
                            fontWeight="medium"
                            sx={{ fontSize: "1.5rem" }}
                          >
                            {step.title}
                          </MDTypography>
                          <MDTypography
                            variant="body1"
                            color="light"
                            mb={3}
                            sx={{
                              fontSize: "1.1rem",
                              lineHeight: 1.6,
                            }}
                          >
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
