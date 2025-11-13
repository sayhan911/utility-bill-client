import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import Bills from "../pages/Bills/Bills";
import Loader from "../components/Loader/Loader";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import MyPayBills from "../pages/MyPayBills/MyPayBills";
import PrivateRoute from "../provider/PrivateRoute";
import BillDetails from "../pages/BillDetails/BillDetails";
import RouteTitle from "../components/RouteTitle/RouteTitle";
import Auth from "../pages/Auth/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <Loader></Loader>,
    children: [
      {
        index: true,
        path: "/",
        element: (
          <RouteTitle title="Home">
            <Home />
          </RouteTitle>
        ),
      },
      {
        path: "bills",
        element: (
          <RouteTitle title="All Bills">
            <Bills />
          </RouteTitle>
        ),
      },
      {
        path: "bills/:id",
        element: (
          <PrivateRoute>
            <RouteTitle title="Bill Details">
              <BillDetails />
            </RouteTitle>
          </PrivateRoute>
        ),
      },
      {
        path: "auth",
        element: (
          <RouteTitle title="Auth">
            <Auth />
          </RouteTitle>
        ),
      },
      {
        path: "register",
        element: (
          <RouteTitle title="Register">
            <Register />
          </RouteTitle>
        ),
      },
      {
        path: "login",
        element: (
          <RouteTitle title="Login">
            <Login />
          </RouteTitle>
        ),
      },
      {
        path: "my-bills",
        element: (
          <PrivateRoute>
            <RouteTitle title="My Bills">
              <MyPayBills />
            </RouteTitle>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
