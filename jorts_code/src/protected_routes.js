import Icon from "@mui/material/Icon";
import SignUp from "frontend/authentication/sign-up";
import SignIn from "frontend/authentication/sign-in";
import Vote from "frontend/vote";
import Upload from "frontend/upload";
import About from "frontend/about";
import Profile from "frontend/profile";
import Landing from "frontend/landing";

// Public routes (before login)
export const publicRoutes = [
  {
    type: "collapse",
    name: "Landing",
    key: "landing",
    icon: <Icon fontSize="small">home</Icon>,
    route: "/landing",
    component: <Landing />,
    public: true,
  },
  {
    type: "collapse",
    name: "About",
    key: "about",
    icon: <Icon fontSize="small">info</Icon>,
    route: "/about",
    component: <About />,
    public: true,
    alwaysShow: true, // This will show in both authenticated and non-authenticated states
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    public: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">person_add</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
    public: true,
  },
];

// Protected routes (after login)
export const privateRoutes = [
  {
    type: "collapse",
    name: "About",
    key: "about-auth",
    icon: <Icon fontSize="small">info</Icon>,
    route: "/about",
    component: <About />,
    protected: true,
    alwaysShow: true,
  },
  {
    type: "collapse",
    name: "Vote",
    key: "vote",
    icon: <Icon fontSize="small">how_to_vote</Icon>,
    route: "/vote",
    component: <Vote />,
    protected: true,
  },
  {
    type: "collapse",
    name: "Upload Outfit",
    key: "upload",
    icon: <Icon fontSize="small">upload</Icon>,
    route: "/upload",
    component: <Upload />,
    protected: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
    protected: true,
  },
];

// Hidden routes (accessible but not shown in nav)
export const hiddenRoutes = [
  {
    key: "root-landing",
    route: "/",
    component: <Landing />,
    public: true,
    hidden: true,
  },
];

// All routes combined for overall routing
const allRoutes = [...publicRoutes, ...privateRoutes, ...hiddenRoutes];

export default allRoutes;
