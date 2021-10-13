import Home from "../views/Home";
import Login from "../views/Login";

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
];

export default routes;
