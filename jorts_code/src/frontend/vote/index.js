import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDSnackbar from "components/MDSnackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Mock data structure
const mockOutfits = [
  {
    id: 1,
    image: "/api/placeholder/400/500",
    user: "fashion_enthusiast",
    caption: "Summer vibes with a casual twist",
    items: [
      { brand: "Nike", item: "Air Max", link: "#" },
      { brand: "Levi's", item: "501 Jeans", link: "#" },
    ],
    reactions: {
      "👍": 24,
      "🔥": 15,
      "😐": 8,
    },
    votes: 150,
  },
  {
    id: 2,
    image: "/api/placeholder/400/500",
    user: "style_master",
    caption: "Business casual done right",
    items: [
      { brand: "Uniqlo", item: "Oxford Shirt", link: "#" },
      { brand: "Zara", item: "Chinos", link: "#" },
    ],
    reactions: {
      "👍": 18,
      "🔥": 12,
      "😐": 5,
    },
    votes: 120,
  },
];

function Vote() {
  // Original voting state
  const [votes, setVotes] = useState({});
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  // Comment system state
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  // UI state
  const [notification, setNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showOutfitDetails, setShowOutfitDetails] = useState(null);
  const [reportDialog, setReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  // Calculate vote percentages
  const calculatePercentages = (outfitIndex) => {
    const currentPair = `page_${outfitIndex}`;
    if (!votes[currentPair]) return { outfit1: 50, outfit2: 50 };

    const total = votes[currentPair].outfit1 + votes[currentPair].outfit2;
    if (total === 0) return { outfit1: 50, outfit2: 50 };

    return {
      outfit1: Math.round((votes[currentPair].outfit1 / total) * 100),
      outfit2: Math.round((votes[currentPair].outfit2 / total) * 100),
    };
  };

  // Navigation handlers
  const handlePreviousPage = () => {
    if (currentOutfitIndex >= 2) {
      setCurrentOutfitIndex(currentOutfitIndex - 2);
      setHasVoted(false);
    }
  };

  const handleNextPage = () => {
    if (currentOutfitIndex + 2 < mockOutfits.length) {
      setCurrentOutfitIndex(currentOutfitIndex + 2);
      setHasVoted(false);
    }
  };

  const handleVote = (index) => {
    if (!hasVoted) {
      const currentPair = `page_${currentOutfitIndex}`;
      const newVotes = { ...votes };

      if (!newVotes[currentPair]) {
        newVotes[currentPair] = { outfit1: 0, outfit2: 0 };
      }

      const outfitKey = index === 0 ? "outfit1" : "outfit2";
      newVotes[currentPair][outfitKey] += 1;

      setVotes(newVotes);
      setHasVoted(true);
      setNotificationMessage("Vote recorded!");
      setNotification(true);
    }
  };

  const handleReaction = (outfitId, reaction) => {
    // In a real app, this would update the backend
    setNotificationMessage(`Added ${reaction} reaction!`);
    setNotification(true);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      const outfitKey = `outfit_${currentOutfitIndex}`;
      const newComments = { ...comments };
      const commentObj = {
        id: Date.now(),
        text: newComment,
        user: "current_user",
        timestamp: new Date(),
        replies: [],
      };

      if (!newComments[outfitKey]) {
        newComments[outfitKey] = [];
      }

      if (replyTo) {
        const parentComment = newComments[outfitKey].find((c) => c.id === replyTo);
        if (parentComment) {
          parentComment.replies.push(commentObj);
        }
        setReplyTo(null);
      } else {
        newComments[outfitKey].unshift(commentObj);
      }

      setComments(newComments);
      setNewComment("");
      setNotificationMessage("Comment added successfully!");
      setNotification(true);
    }
  };

  const handleReport = () => {
    setReportDialog(false);
    setMenuAnchor(null);
    setNotificationMessage("Report submitted successfully!");
    setNotification(true);
    setReportReason("");
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
              >
                <MDTypography variant="h6" color="white">
                  Vote for the Best Outfit!
                </MDTypography>
              </MDBox>

              <MDBox p={3}>
                <Grid container spacing={4}>
                  {[0, 1].map((index) => {
                    const outfit = mockOutfits[currentOutfitIndex + index];
                    const percentages = calculatePercentages(currentOutfitIndex);
                    const percentage = index === 0 ? percentages.outfit1 : percentages.outfit2;

                    return (
                      <Grid item xs={12} md={6} key={outfit?.id || index}>
                        <MDBox
                          position="relative"
                          borderRadius="lg"
                          shadow="md"
                          overflow="hidden"
                          minHeight="500px"
                        >
                          {/* Image */}
                          <MDBox
                            component="img"
                            src={outfit?.image}
                            alt={`Outfit ${index + 1}`}
                            width="100%"
                            height="100%"
                            position="absolute"
                            top={0}
                            left={0}
                            sx={{ objectFit: "cover" }}
                          />

                          {/* Vote Percentage Overlay */}
                          {hasVoted && (
                            <MDBox
                              position="absolute"
                              top={0}
                              left={0}
                              right={0}
                              height="4px"
                              sx={{
                                background: `linear-gradient(90deg, #1A73E8 ${percentage}%, transparent ${percentage}%)`,
                                transition: "all 0.5s ease-in-out",
                              }}
                            />
                          )}

                          {/* Controls Overlay */}
                          <MDBox
                            position="absolute"
                            bottom={0}
                            left={0}
                            right={0}
                            p={2}
                            sx={{
                              background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                              transition: "transform 0.3s",
                            }}
                          >
                            {/* User Info */}
                            <MDTypography variant="subtitle2" color="white">
                              {outfit?.user}
                            </MDTypography>

                            {/* Actions */}
                            <MDBox display="flex" justifyContent="space-between" mt={1}>
                              {/* Reactions */}
                              <MDBox>
                                {outfit?.reactions &&
                                  Object.entries(outfit.reactions).map(([reaction, count]) => (
                                    <MDButton
                                      key={reaction}
                                      variant="text"
                                      color="white"
                                      onClick={() => handleReaction(outfit.id, reaction)}
                                      sx={{ minWidth: "auto", p: 1 }}
                                    >
                                      {reaction} {count}
                                    </MDButton>
                                  ))}
                              </MDBox>

                              {/* Info & Menu */}
                              <MDBox>
                                <MDButton
                                  variant="text"
                                  color="white"
                                  onClick={() => setShowOutfitDetails(outfit)}
                                >
                                  <Icon>info</Icon>
                                </MDButton>
                                <MDButton
                                  variant="text"
                                  color="white"
                                  onClick={(e) => {
                                    setMenuAnchor(e.currentTarget);
                                    setSelectedOutfit(outfit);
                                  }}
                                >
                                  <Icon>more_vert</Icon>
                                </MDButton>
                              </MDBox>
                            </MDBox>

                            {/* Vote Button and Percentage */}
                            <MDBox display="flex" alignItems="center" mt={1}>
                              <MDButton
                                variant="contained"
                                color="info"
                                fullWidth
                                onClick={() => handleVote(index)}
                                disabled={hasVoted}
                              >
                                Vote for this outfit
                              </MDButton>
                              {hasVoted && (
                                <MDTypography variant="h6" color="white" ml={1}>
                                  {percentage}%
                                </MDTypography>
                              )}
                            </MDBox>
                          </MDBox>
                        </MDBox>
                      </Grid>
                    );
                  })}
                </Grid>

                {/* Navigation Buttons */}
                <MDBox mt={4} display="flex" justifyContent="space-between">
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
                    disabled={currentOutfitIndex + 2 >= mockOutfits.length}
                  >
                    Next&nbsp;<Icon>arrow_forward</Icon>
                  </MDButton>
                </MDBox>

                {/* Comments Section */}
                <MDBox mt={4}>
                  <MDTypography variant="h6" gutterBottom>
                    Comments
                  </MDTypography>
                  <MDBox mb={2}>
                    <MDInput
                      fullWidth
                      multiline
                      rows={2}
                      placeholder={replyTo ? "Write a reply..." : "Add your comment..."}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <MDBox mt={1} display="flex" justifyContent="flex-end">
                      {replyTo && (
                        <MDButton
                          variant="text"
                          color="error"
                          onClick={() => setReplyTo(null)}
                          sx={{ mr: 1 }}
                        >
                          Cancel Reply
                        </MDButton>
                      )}
                      <MDButton variant="contained" color="info" onClick={handleComment}>
                        {replyTo ? "Reply" : "Comment"}
                      </MDButton>
                    </MDBox>
                  </MDBox>

                  <MDBox>
                    {(comments[`outfit_${currentOutfitIndex}`] || []).map((comment) => (
                      <MDBox key={comment.id} mb={2}>
                        <MDBox p={2} borderRadius="lg" sx={{ backgroundColor: "grey.100" }}>
                          <MDTypography variant="subtitle2">{comment.user}</MDTypography>
                          <MDTypography variant="body2">{comment.text}</MDTypography>
                          <MDBox display="flex" justifyContent="flex-end" mt={1}>
                            <MDButton
                              variant="text"
                              color="info"
                              onClick={() => setReplyTo(comment.id)}
                            >
                              Reply
                            </MDButton>
                          </MDBox>
                        </MDBox>

                        {/* Replies */}
                        {comment.replies?.map((reply) => (
                          <MDBox
                            key={reply.id}
                            ml={4}
                            mt={1}
                            p={2}
                            borderRadius="lg"
                            sx={{ backgroundColor: "grey.50" }}
                          >
                            <MDTypography variant="subtitle2">{reply.user}</MDTypography>
                            <MDTypography variant="body2">{reply.text}</MDTypography>
                          </MDBox>
                        ))}
                      </MDBox>
                    ))}
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {/* Outfit Details Dialog */}
      <Dialog
        open={!!showOutfitDetails}
        onClose={() => setShowOutfitDetails(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Outfit Details</DialogTitle>
        <DialogContent>
          <MDTypography variant="body1" mb={2}>
            {showOutfitDetails?.caption}
          </MDTypography>
          <Divider />
          <MDTypography variant="h6" mt={2} mb={1}>
            Items
          </MDTypography>
          {showOutfitDetails?.items.map((item, index) => (
            <MDBox key={index} mb={1}>
              <MDTypography variant="body2">
                {item.brand} - {item.item}
                {item.link && (
                  <MDButton
                    variant="text"
                    component="a"
                    href={item.link}
                    target="_blank"
                    sx={{ ml: 1 }}
                  >
                    Shop
                  </MDButton>
                )}
              </MDTypography>
            </MDBox>
          ))}
        </DialogContent>
        <DialogActions>
          <MDButton onClick={() => setShowOutfitDetails(null)}>Close</MDButton>
        </DialogActions>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={reportDialog} onClose={() => setReportDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Report Outfit</DialogTitle>
        <DialogContent>
          <MDBox mt={2}>
            <MDInput
              label="Reason for reporting"
              multiline
              rows={4}
              fullWidth
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            />
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={() => setReportDialog(false)}>Cancel</MDButton>
          <MDButton onClick={handleReport} color="error">
            Submit Report
          </MDButton>
        </DialogActions>
      </Dialog>

      {/* More Options Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            setReportDialog(true);
            setMenuAnchor(null);
          }}
        >
          Report
        </MenuItem>
      </Menu>

      {/* Notifications */}
      <MDSnackbar
        color="success"
        icon="check"
        title="Success"
        content={notificationMessage}
        open={notification}
        onClose={() => setNotification(false)}
        close={() => setNotification(false)}
        autoHideDuration={3000}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default Vote;