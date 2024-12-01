import Icon from "@mui/material/Icon";
import SignUp from "frontend/authentication/sign-up";
import SignIn from "frontend/authentication/sign-in";
import Vote from "frontend/vote";
import Upload from "frontend/upload";
import About from "frontend/about";
import Profile from "frontend/profile";

// Test routes without protection
const routes = [
  {
    type: "collapse",
    name: "About",
    key: "about",
    icon: <Icon fontSize="small">info</Icon>,
    route: "/test/about",
    component: <About />,
  },
  {
    type: "collapse",
    name: "Vote (Test)",
    key: "vote-test",
    icon: <Icon fontSize="small">how_to_vote</Icon>,
    route: "/test/vote",
    component: <Vote />, // No PrivateRoute wrapper
  },
  {
    type: "collapse",
    name: "Upload (Test)",
    key: "upload-test",
    icon: <Icon fontSize="small">upload</Icon>,
    route: "/test/upload",
    component: <Upload />, // No PrivateRoute wrapper
  },
  {
    type: "collapse",
    name: "Profile (Test)",
    key: "profile-test",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/test/profile",
    component: <Profile />, // No PrivateRoute wrapper
  },
];

export default routes;