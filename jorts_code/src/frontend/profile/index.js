import { useState } from "react";
import { Grid, Divider, Card, Tab, Tabs, IconButton } from "@mui/material";
import { Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const mockUserData = {
  username: "testuser",
  joinDate: "December 2024",
  totalPosts: 1,
  followers: 0,
  following: 0,
  bio: "Chill Guy",
  profilePicture: "/demo-images/profile.jpg",
};

const mockPosts = Array(1).fill({
  image: "/demo-images/myoutfit.jpg",
  likes: 0,
  comments: 0,
  date: "2023-11-01",
});

function Profile() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={2}>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item>
                    <MDAvatar
                      src={mockUserData.profilePicture}
                      alt="profile-image"
                      size="xl"
                      sx={{ width: 150, height: 150 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox height="100%" mt={0.5} lineHeight={1}>
                      <MDTypography variant="h5" fontWeight="medium">
                        {mockUserData.username}
                      </MDTypography>
                      <MDTypography variant="button" color="text" fontWeight="regular">
                        Member since {mockUserData.joinDate}
                      </MDTypography>
                      <MDBox mt={1}>
                        <MDTypography variant="button" color="text">
                          {mockUserData.bio}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MDBox display="flex" justifyContent="flex-end">
                      <MDButton variant="gradient" color="info">
                        Edit Profile
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
                <MDBox mt={3} mb={1}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <MDBox textAlign="center">
                        <MDTypography variant="h6">{mockUserData.totalPosts}</MDTypography>
                        <MDTypography variant="button" color="text">
                          Posts
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={4}>
                      <MDBox textAlign="center">
                        <MDTypography variant="h6">{mockUserData.followers}</MDTypography>
                        <MDTypography variant="button" color="text">
                          Followers
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={4}>
                      <MDBox textAlign="center">
                        <MDTypography variant="h6">{mockUserData.following}</MDTypography>
                        <MDTypography variant="button" color="text">
                          Following
                        </MDTypography>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
              <Divider />
              <MDBox>
                <Tabs value={tab} onChange={handleTabChange} centered>
                  <Tab label="My Outfits" icon={<Icon>grid_on</Icon>} iconPosition="start" />
                  <Tab label="Liked" icon={<Icon>favorite</Icon>} iconPosition="start" />
                  <Tab label="Stats" icon={<Icon>assessment</Icon>} iconPosition="start" />
                </Tabs>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <MDBox p={2}>
                {tab === 0 && (
                  <Grid container spacing={2}>
                    {mockPosts.map((post, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <MDBox
                          borderRadius="lg"
                          shadow="md"
                          overflow="hidden"
                          position="relative"
                          sx={{
                            "&:hover": {
                              "& .post-overlay": {
                                opacity: 1,
                              },
                            },
                          }}
                        >
                          <MDBox
                            component="img"
                            src={post.image}
                            alt={`outfit-${index}`}
                            width="100%"
                            height="auto"
                          />
                          <MDBox
                            className="post-overlay"
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            bgcolor="rgba(0,0,0,0.3)"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            opacity={0}
                            transition="opacity 0.2s"
                          >
                            <MDBox color="white" display="flex" alignItems="center" mr={2}>
                              <Icon>favorite</Icon>
                              <MDTypography variant="body2" color="white" ml={1}>
                                {post.likes}
                              </MDTypography>
                            </MDBox>
                            <MDBox color="white" display="flex" alignItems="center">
                              <Icon>chat_bubble</Icon>
                              <MDTypography variant="body2" color="white" ml={1}>
                                {post.comments}
                              </MDTypography>
                            </MDBox>
                          </MDBox>
                        </MDBox>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {tab === 1 && (
                  <MDTypography variant="body2" color="text">
                    Outfits you&apos;ve liked will appear here
                  </MDTypography>
                )}

                {tab === 2 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <MDBox mb={3}>
                        <MDTypography variant="h6">Engagement Stats</MDTypography>
                        <MDBox mt={2}>
                          <MDTypography variant="button" color="text">
                            Average Likes: 0
                          </MDTypography>
                          <br />
                          <MDTypography variant="button" color="text">
                            Most Popular Post: 0 likes
                          </MDTypography>
                          <br />
                          <MDTypography variant="button" color="text">
                            Total Comments: 0
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDBox mb={3}>
                        <MDTypography variant="h6">Activity Overview</MDTypography>
                        <MDBox mt={2}>
                          <MDTypography variant="button" color="text">
                            Posting Streak: 0 days
                          </MDTypography>
                          <br />
                          <MDTypography variant="button" color="text">
                            Last Post: 0 hours ago
                          </MDTypography>
                          <br />
                          <MDTypography variant="button" color="text">
                            Vote Participation: 0%
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    </Grid>
                  </Grid>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Profile;
