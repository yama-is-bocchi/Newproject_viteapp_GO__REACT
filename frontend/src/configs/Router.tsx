import Top from "../components/Top/index.tsx";
import About from "../components/Top/about.tsx";
import SignUp from "../components/Sign/SignUp.tsx";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Top /> },
  { path: "/About", element: <About /> },
  { path: "/SignUp", element: <SignUp /> },
]);

export default router;
