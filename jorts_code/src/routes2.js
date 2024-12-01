import Icon from "@mui/material/Icon";
import SignUp from "frontend/authentication/sign-up";
import SignIn from "frontend/authentication/sign-in";
import Vote from "frontend/vote";
import Upload from "frontend/upload";
import About from "frontend/about";
import Profile from "frontend/profile";
import Landing from "frontend/landing";

const routes = [
  // Pre-login routes
  {
    type: "collapse",
    name: "Landing",
    key: "landing",
    icon: <Icon fontSize="small">home</Icon>,
    route: "/landing",
    component: <Landing />,
    showOnlyBeforeLogin: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    showOnlyBeforeLogin: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">person_add</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
    showOnlyBeforeLogin: true,
  },

  // Main app routes
  {
    type: "collapse",
    name: "About",
    key: "about",
    icon: <Icon fontSize="small">info</Icon>,
    route: "/about",
    component: <About />,
  },
  {
    type: "collapse",
    name: "Vote",
    key: "vote",
    icon: <Icon fontSize="small">how_to_vote</Icon>,
    route: "/vote",
    component: <Vote />,
  },
  {
    type: "collapse",
    name: "Upload Outfit",
    key: "upload",
    icon: <Icon fontSize="small">upload</Icon>,
    route: "/upload",
    component: <Upload />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },

  // Root landing page
  {
    type: "hidden",
    key: "root",
    route: "/",
    component: <Landing />,
  },
];

export default routes;
