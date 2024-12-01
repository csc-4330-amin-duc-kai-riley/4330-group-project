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

function Vote() {
  // Backend data state
  const [currentPair, setCurrentPair] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(false);

  // UI state from original version
  const [hasVoted, setHasVoted] = useState(false);
  const [notification, setNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showOutfitDetails, setShowOutfitDetails] = useState(null);
  const [reportDialog, setReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  // Comments state - enhanced for backend
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    fetchPair();
  }, []);

  // Fetch outfit pair from backend
  const fetchPair = async (page = currentPage) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/votes/pairs?page=${page}`);
      const data = await response.json();
      if (response.ok) {
        setCurrentPair(data.pair);
        setCurrentPage(data.pagination.currentPage);
        setTotalPages(data.pagination.totalPages);
        setHasNext(data.pagination.hasNext);
        setHasPrevious(data.pagination.hasPrevious);
        setHasVoted(false);
        setComments([]);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch outfits");
    } finally {
      setLoading(false);
    }
  };
  // Add navigation handlers
  const handlePreviousPage = () => {
    if (hasPrevious) {
      fetchPair(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (hasNext) {
      fetchPair(currentPage + 1);
    }
  };

  // Enhanced vote handler with backend integration
  const handleVote = async (postId) => {
    if (!currentPair || hasVoted) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/votes/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pairId: currentPair._id,
          postId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setHasVoted(true);
        setNotificationMessage("Vote recorded successfully!");
        setNotification(true);
        setCurrentPair((prev) => ({
          ...prev,
          post1Votes: postId === prev.post1._id ? prev.post1Votes + 1 : prev.post1Votes,
          post2Votes: postId === prev.post2._id ? prev.post2Votes + 1 : prev.post2Votes,
        }));
      } else {
        setNotificationMessage(data.message || "Failed to vote");
        setNotification(true);
      }
    } catch (err) {
      setNotificationMessage("Error submitting vote");
      setNotification(true);
    }
  };

  // Enhanced comment handler with backend integration
  const handleComment = async () => {
    if (!newComment.trim() || !currentPair) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/api/posts/${currentPair.post1._id}/comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: newComment,
            replyTo: replyTo || null,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (replyTo) {
          setComments((prev) =>
            prev.map((comment) =>
              comment._id === replyTo
                ? { ...comment, replies: [...(comment.replies || []), data] }
                : comment
            )
          );
          setReplyTo(null);
        } else {
          setComments((prev) => [...prev, data]);
        }
        setNewComment("");
        setNotificationMessage("Comment posted successfully!");
        setNotification(true);
      } else {
        setNotificationMessage(data.message || "Failed to post comment");
        setNotification(true);
      }
    } catch (err) {
      setNotificationMessage("Error posting comment");
      setNotification(true);
    }
  };

  const handleReaction = async (postId, reaction) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/posts/${postId}/react`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reaction }),
      });

      if (response.ok) {
        setNotificationMessage(`Added ${reaction} reaction!`);
        setNotification(true);
      } else {
        setNotificationMessage("Failed to add reaction");
        setNotification(true);
      }
    } catch (err) {
      setNotificationMessage("Error adding reaction");
      setNotification(true);
    }
  };

  const handleReport = async () => {
    if (!reportReason.trim() || !selectedOutfit) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/posts/${selectedOutfit._id}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason: reportReason }),
      });

      if (response.ok) {
        setReportDialog(false);
        setMenuAnchor(null);
        setNotificationMessage("Report submitted successfully!");
        setNotification(true);
        setReportReason("");
      } else {
        setNotificationMessage("Failed to submit report");
        setNotification(true);
      }
    } catch (err) {
      setNotificationMessage("Error submitting report");
      setNotification(true);
    }
  };

  // Loading and error states
  if (loading) {
    return (
      <DashboardLayout>
        <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <MDTypography variant="h4">Loading outfits...</MDTypography>
        </MDBox>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <MDTypography variant="h4" color="error">
            {error}
          </MDTypography>
        </MDBox>
      </DashboardLayout>
    );
  }

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
                {currentPair && (
                  <Grid container spacing={4}>
                    {[currentPair.post1, currentPair.post2].map((post, index) => (
                      <Grid item xs={12} md={6} key={post._id}>
                        <MDBox borderRadius="lg" shadow="md">
                          {/* Image Container */}
                          <MDBox
                            borderRadius="lg"
                            overflow="hidden"
                            position="relative"
                            minHeight="500px"
                          >
                            <MDBox
                              component="img"
                              src={post.image}
                              alt={`Outfit ${index + 1}`}
                              width="100%"
                              height="100%"
                              sx={{ objectFit: "cover" }}
                            />

                            {/* Vote Percentage Bar - Now at top of image */}
                            {hasVoted && (
                              <MDBox
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                height="8px"
                                sx={{
                                  background: `linear-gradient(90deg, #1A73E8 ${
                                    ((index === 0
                                      ? currentPair.post1Votes
                                      : currentPair.post2Votes) /
                                      (currentPair.post1Votes + currentPair.post2Votes)) *
                                    100
                                  }%, transparent ${
                                    ((index === 0
                                      ? currentPair.post1Votes
                                      : currentPair.post2Votes) /
                                      (currentPair.post1Votes + currentPair.post2Votes)) *
                                    100
                                  }%)`,
                                  transition: "all 0.5s ease-in-out",
                                }}
                              />
                            )}
                          </MDBox>

                          {/* Content Below Image */}
                          <MDBox p={3} bgcolor="white" borderRadius="lg">
                            {/* User Info and Vote Count */}
                            <MDBox
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              mb={2}
                            >
                              <MDBox>
                                <MDTypography variant="h6" fontWeight="medium">
                                  {post.userId.username}
                                </MDTypography>
                                {hasVoted && (
                                  <MDTypography variant="body2" color="text">
                                    Votes:{" "}
                                    {index === 0 ? currentPair.post1Votes : currentPair.post2Votes}{" "}
                                    (
                                    {Math.round(
                                      ((index === 0
                                        ? currentPair.post1Votes
                                        : currentPair.post2Votes) /
                                        (currentPair.post1Votes + currentPair.post2Votes)) *
                                        100
                                    )}
                                    %)
                                  </MDTypography>
                                )}
                              </MDBox>
                              <MDButton
                                variant="text"
                                color="info"
                                onClick={(e) => {
                                  setMenuAnchor(e.currentTarget);
                                  setSelectedOutfit(post);
                                }}
                              >
                                <Icon>more_vert</Icon>
                              </MDButton>
                            </MDBox>

                            {/* Outfit Details */}
                            {post.caption && (
                              <MDBox mb={2}>
                                <MDTypography variant="body2" color="text">
                                  {post.caption}
                                </MDTypography>
                              </MDBox>
                            )}

                            {/* Items List */}
                            {post.items && post.items.length > 0 && (
                              <MDBox mb={2}>
                                <MDTypography variant="subtitle2" fontWeight="medium" mb={1}>
                                  Items
                                </MDTypography>
                                {post.items.map((item, itemIndex) => (
                                  <MDBox
                                    key={itemIndex}
                                    display="flex"
                                    justifyContent="space-between"
                                    mb={0.5}
                                  >
                                    <MDTypography variant="body2" color="text">
                                      {item.brand} - {item.item}
                                    </MDTypography>
                                    {item.link && (
                                      <MDButton
                                        variant="text"
                                        size="small"
                                        component="a"
                                        href={item.link}
                                        target="_blank"
                                      >
                                        Shop
                                      </MDButton>
                                    )}
                                  </MDBox>
                                ))}
                              </MDBox>
                            )}

                            {/* Reactions */}
                            <MDBox display="flex" gap={1} mb={2}>
                              {post.reactions &&
                                Object.entries(post.reactions).map(([reaction, count]) => (
                                  <MDButton
                                    key={reaction}
                                    variant="outlined"
                                    color="info"
                                    size="small"
                                    onClick={() => handleReaction(post._id, reaction)}
                                  >
                                    {reaction} {count}
                                  </MDButton>
                                ))}
                            </MDBox>

                            {/* Vote Button */}
                            <MDButton
                              variant="gradient"
                              color="info"
                              fullWidth
                              onClick={() => handleVote(post._id)}
                              disabled={hasVoted}
                              sx={{ mt: 1 }}
                            >
                              {hasVoted
                                ? `${Math.round(
                                    ((index === 0
                                      ? currentPair.post1Votes
                                      : currentPair.post2Votes) /
                                      (currentPair.post1Votes + currentPair.post2Votes)) *
                                      100
                                  )}% of votes`
                                : "Vote for this outfit"}
                            </MDButton>
                          </MDBox>
                        </MDBox>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {/* Navigation Buttons */}
                <MDBox mt={4} display="flex" justifyContent="space-between">
                  <MDButton
                    variant="outlined"
                    color="info"
                    onClick={handlePreviousPage}
                    disabled={!hasPrevious}
                  >
                    <Icon>arrow_back</Icon>&nbsp;Previous Page
                  </MDButton>
                  <MDTypography variant="h6" color="text">
                    Page {currentPage} of {totalPages}
                  </MDTypography>
                  <MDButton
                    variant="outlined"
                    color="info"
                    onClick={handleNextPage}
                    disabled={!hasNext}
                  >
                    Next Page&nbsp;<Icon>arrow_forward</Icon>
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
                    {comments.map((comment) => (
                      <MDBox key={comment._id} mb={2}>
                        <MDBox p={2} borderRadius="lg" sx={{ backgroundColor: "grey.100" }}>
                          <MDTypography variant="subtitle2">{comment.userId.username}</MDTypography>
                          <MDTypography variant="body2">{comment.text}</MDTypography>
                          <MDBox display="flex" justifyContent="flex-end" mt={1}>
                            <MDButton
                              variant="text"
                              color="info"
                              onClick={() => setReplyTo(comment._id)}
                            >
                              Reply
                            </MDButton>
                          </MDBox>
                        </MDBox>

                        {/* Replies */}
                        {comment.replies?.map((reply) => (
                          <MDBox
                            key={reply._id}
                            ml={4}
                            mt={1}
                            p={2}
                            borderRadius="lg"
                            sx={{ backgroundColor: "grey.50" }}
                          >
                            <MDTypography variant="subtitle2">{reply.userId.username}</MDTypography>
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
          {showOutfitDetails?.items?.map((item, index) => (
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
