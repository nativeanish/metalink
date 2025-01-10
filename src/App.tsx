import Index from "../pages/Index";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Theme from "../pages/Theme";
import Editor from "../pages/Editor";
import NotFound from "../pages/NotFound";
import Publish from "../pages/Publish";
import Dashboard from "../pages/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/onboard",
    element: <Navigate to="/theme" replace />,
  },
  {
    path: "/theme",
    element: <Theme />,
  },
  {
    path: "/editor",
    element: <Editor />,
  },
  {
    path: "/publish",
    element: <Publish />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
