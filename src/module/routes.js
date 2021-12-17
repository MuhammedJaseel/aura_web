import Dashboard from "../screen_component/dashbord";
import Space from "../screen_component/space";
import Supports from "../screen_component/support";
import Alliances from "../screen_component/alinces";
import Stream from "../screen_component/streams";
import HomeCommunity from "../screen_component/community";
import HomeManageteam from "../screen_component/manageteam";
import HomeAnnouncements from "../screen_component/announcement";
import Visitors from "../screen_component/visitors";

const dashboardRoutes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: "fas fa-tachometer-alt",
    component: Dashboard,
  },
  {
    path: "/admin/space",
    name: "Space",
    icon: "fas fa-map-marker-alt",
    component: Space,
  },
  {
    path: "/admin/community",
    name: "Community",
    icon: "fas fa-sticky-note",
    component: HomeCommunity,
  },
  {
    path: "/admin/manageteam",
    name: "Manage Team",
    icon: "fas fa-layer-group",
    component: HomeManageteam,
  },
  {
    path: "/admin/supports",
    name: "Supports",
    icon: "	fas fa-headset",
    component: Supports,
  },
  {
    path: "/admin/announcements",
    name: "Announcements",
    icon: "	fas fa-volume-up",
    component: HomeAnnouncements,
  },
  {
    path: "/admin/alliances",
    name: "Alliances",
    icon: "fas fa-gift",
    component: Alliances,
  },
  {
    path: "/admin/stream",
    name: "Stream",
    icon: "fas fa-code-branch",
    component: Stream,
  },
  {
    path: "/admin/configuration",
    name: "Configuration",
    icon: "fas fa-shield-alt",
    component: Alliances,
  },
  {
    path: "/admin/visitors",
    name: "Visitors",
    icon: "fas fa-user-shield",
    component: Visitors,
  },
  {
    path: "/admin/enquires",
    name: "Enquires",
    icon: "fas fa-puzzle-piece",
    component: Alliances,
  },
  {
    path: "/admin/integration",
    name: "Integration",
    icon: "fab fa-steam",
    component: Alliances,
  },
  {
    path: "/admin/documents",
    name: "Documents",
    icon: "fas fa-file",
    component: Alliances,
  },
  {
    path: "/admin/billingsettings",
    name: "Billing Settings",
    icon: "far fa-file-alt",
    component: Alliances,
  },
  {
    path: "/admin/support",
    name: "Support",
    icon: "fab fa-twitch",
    component: Alliances,
  },
];

export default dashboardRoutes;
