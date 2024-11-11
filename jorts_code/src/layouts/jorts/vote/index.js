import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const exampleImages = [
  "/api/placeholder/400/500",
  "/api/placeholder/400/500",
  "/api/placeholder/400/500",
  "/api/placeholder/400/500",
  "/api/placeholder/400/500",
  "/api/placeholder/400/500",
  "/api/placeholder/400/500",
  "/api/placeholder/400/500",
  "/api/placeholder/400/500",
  "/api/placeholder/400/500",
];

function Vote() {
  const [votes, setVotes] = useState({});
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [notification, setNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const storedVotes = JSON.parse(localStorage.getItem("votes")) || {};
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    setVotes(storedVotes);
    setComments(storedComments);

    if (storedVotes[`page_${currentOutfitIndex}`]) {
      setHasVoted(true);
    } else {
      setHasVoted(false);
    }
  }, [currentOutfitIndex]);

  const currentOutfits = [exampleImages[currentOutfitIndex], exampleImages[currentOutfitIndex + 1]];

  const handleVote = (fit) => {
    if (!hasVoted) {
      const newVotes = { ...votes };
      const outfitKey = `page_${currentOutfitIndex}`;

      if (!newVotes[outfitKey]) {
        newVotes[outfitKey] = { fit1: 0, fit2: 0 };
      }

      newVotes[outfitKey][`fit${fit}`] += 1;
      setVotes(newVotes);
      setHasVoted(true);
      localStorage.setItem("votes", JSON.stringify(newVotes));

      setNotificationMessage("Vote recorded successfully!");
      setNotification(true);
    }
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      const outfitKey = `page_${currentOutfitIndex}`;
      const newComments = { ...comments };

      if (!newComments[outfitKey]) {
        newComments[outfitKey] = [];
      }

      newComments[outfitKey].push(newComment);
      setComments(newComments);
      setNewComment("");
      localStorage.setItem("comments", JSON.stringify(newComments));

      setNotificationMessage("Comment posted successfully!");
      setNotification(true);
    }
  };

  const handleNextPage = () => {
    if (currentOutfitIndex + 2 < exampleImages.length) {
      setCurrentOutfitIndex(currentOutfitIndex + 2);
      setNewComment("");
    }
  };

  const handlePreviousPage = () => {
    if (currentOutfitIndex - 2 >= 0) {
      setCurrentOutfitIndex(currentOutfitIndex - 2);
      setNewComment("");
    }
  };

  const closeNotification = () => setNotification(false);

  const totalVotes = votes[`page_${currentOutfitIndex}`]
    ? votes[`page_${currentOutfitIndex}`].fit1 + votes[`page_${currentOutfitIndex}`].fit2
    : 0;
  const fit1Percentage = totalVotes
    ? Math.round((votes[`page_${currentOutfitIndex}`].fit1 / totalVotes) * 100)
    : 0;
  const fit2Percentage = totalVotes
    ? Math.round((votes[`page_${currentOutfitIndex}`].fit2 / totalVotes) * 100)
    : 0;

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
                  Vote for the Best Outfit!
                </MDTypography>
              </MDBox>

              <MDBox p={3}>
                <Grid container spacing={4}>
                  {[0, 1].map((index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <MDBox
                        borderRadius="lg"
                        shadow="md"
                        overflow="hidden"
                        position="relative"
                        minHeight="400px"
                      >
                        <MDBox
                          component="img"
                          src={currentOutfits[index]}
                          alt={`Outfit ${index + 1}`}
                          width="100%"
                          height="100%"
                          position="absolute"
                          top={0}
                          left={0}
                          sx={{ objectFit: "cover" }}
                        />
                        <MDBox
                          position="absolute"
                          bottom={0}
                          left={0}
                          right={0}
                          p={2}
                          sx={{
                            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                          }}
                        >
                          {!hasVoted ? (
                            <MDButton
                              variant="contained"
                              color="info"
                              onClick={() => handleVote(index + 1)}
                              fullWidth
                            >
                              Vote for Outfit {index + 1}
                            </MDButton>
                          ) : (
                            <MDTypography variant="h4" color="white">
                              {index === 0 ? fit1Percentage : fit2Percentage}%
                            </MDTypography>
                          )}
                        </MDBox>
                      </MDBox>
                    </Grid>
                  ))}
                </Grid>

                <MDBox mt={4}>
                  <MDTypography variant="h6" gutterBottom>
                    Comments
                  </MDTypography>
                  <MDBox mb={2}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Add your comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      variant="outlined"
                    />
                    <MDBox mt={1}>
                      <MDButton variant="gradient" color="info" onClick={handlePostComment}>
                        Post Comment
                      </MDButton>
                    </MDBox>
                  </MDBox>

                  <MDBox>
                    {comments[`page_${currentOutfitIndex}`]?.map((comment, index) => (
                      <MDBox
                        key={index}
                        p={2}
                        mb={1}
                        borderRadius="lg"
                        sx={{ backgroundColor: "grey.100" }}
                      >
                        <MDTypography variant="body2">{comment}</MDTypography>
                      </MDBox>
                    ))}
                  </MDBox>
                </MDBox>

                <MDBox mt={4} display="flex" justifyContent="space-between" alignItems="center">
                  <MDButton
                    variant="outlined"
                    color="info"
                    onClick={handlePreviousPage}
                    disabled={currentOutfitIndex === 0}
                  >
                    <Icon>arrow_back</Icon>&nbsp;Previous
                  </MDButton>
                  <MDButton
                    variant="outlined"
                    color="info"
                    onClick={handleNextPage}
                    disabled={currentOutfitIndex + 2 >= exampleImages.length}
                  >
                    Next&nbsp;<Icon>arrow_forward</Icon>
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <MDSnackbar
        color="success"
        icon="check"
        title="Success"
        content={notificationMessage}
        open={notification}
        onClose={closeNotification}
        close={closeNotification}
        autoHideDuration={3000}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default Vote;
