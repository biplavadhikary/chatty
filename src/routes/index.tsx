import ConversationsDashboard from "../views/ConversationsDashboard";
import Home from "../views/Home";
import Login from "../views/Login";
import PostLogin from "../views/PostLogin";

type RouteConfig = {
  path: string;
  component: any;
  exact: boolean;
  id: string;
};

const routes: RouteConfig[] = [
  {
    id: "Home",
    path: "/",
    exact: true,
    component: Home,
  },
  {
    id: "Login",
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    id: "LoginSuccessLoader",
    path: "/login-Success",
    exact: true,
    component: PostLogin,
  },
  {
    id: "ConversationsDashboard",
    path: "/conversations-dashboard/:userId",
    exact: true,
    component: ConversationsDashboard,
  },
];

export default routes;
