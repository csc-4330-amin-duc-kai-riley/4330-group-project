import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function Landing() {
  const navigate = useNavigate();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerChildren}>
      {/* Navigation */}
      <MDBox
        px={4}
        py={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        component={motion.div}
        variants={fadeIn}
      >
        <MDTypography variant="h3" color="info" fontWeight="bold">
          JORTS
        </MDTypography>
        <MDBox>
          <MDButton variant="text" color="white" onClick={() => navigate("/about")}>
            About
          </MDButton>
          <MDButton
            variant="contained"
            color="info"
            onClick={() => navigate("/authentication/sign-in")}
            sx={{ ml: 2 }}
          >
            Sign In
          </MDButton>
        </MDBox>
      </MDBox>

      {/* Hero Section */}
      <MDBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        mt={8}
        px={3}
        component={motion.div}
        variants={fadeIn}
      >
        <MDTypography
          variant="h1"
          color="white"
          mb={3}
          sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}
        >
          Join Others, Rate Today&#39;s Styles
        </MDTypography>
        <MDTypography variant="h4" color="text" mb={6} sx={{ maxWidth: "700px" }}>
          Upload your daily fits, vote on others&#39; styles, and become part of a growing fashion
          community.
        </MDTypography>
        <MDButton
          variant="gradient"
          color="info"
          size="large"
          onClick={() => navigate("/authentication/sign-up")}
        >
          Get Started
        </MDButton>
      </MDBox>

      {/* Features Section */}
      <MDBox
        mt={12}
        px={4}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
        component={motion.div}
        variants={fadeIn}
      >
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
          <motion.div
            key={feature.title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.2 },
              },
            }}
          >
            <MDBox
              width="300px"
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
              <MDTypography variant="h1" color="white" mb={2}>
                {feature.icon}
              </MDTypography>
              <MDTypography variant="h5" color="white" mb={2}>
                {feature.title}
              </MDTypography>
              <MDTypography variant="body2" color="text">
                {feature.description}
              </MDTypography>
            </MDBox>
          </motion.div>
        ))}
      </MDBox>

      {/* How It Works Section */}
      <MDBox mt={12} px={4} mb={6} component={motion.div} variants={fadeIn}>
        <MDTypography variant="h2" color="white" textAlign="center" mb={6}>
          How It Works
        </MDTypography>
        <MDBox display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
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
            <motion.div
              key={step.step}
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -20 : 20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { delay: index * 0.2 },
                },
              }}
            >
              <MDBox
                width="270px"
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
            </motion.div>
          ))}
        </MDBox>
      </MDBox>
    </motion.div>
  );
}

export default Landing;
