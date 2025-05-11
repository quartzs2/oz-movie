import Layout from "@components/Layout";
import Login from "@pages/Login";
import Main from "@pages/Main";
import MovieDetail from "@pages/MovieDetail";
import NotFound from "@pages/NotFound";
import Signup from "@pages/Signup";
import { Route, Routes } from "react-router";

const App = () => {
  const ROUTES = [
    {
      element: <Main />,
      path: "/",
    },
    {
      element: <Signup />,
      path: "signup",
    },
    {
      element: <Login />,
      path: "login",
    },
    {
      element: <MovieDetail />,
      path: "details/:id",
    },
    { element: <NotFound />, path: "*" },
  ];

  return (
    <Routes>
      <Route element={<Layout />} path="/">
        {ROUTES.map((route) => (
          <Route element={route.element} key={route.path} path={route.path} />
        ))}
      </Route>
    </Routes>
  );
};
export default App;
