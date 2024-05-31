import Top from "../components/Top/index.tsx";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([{ path: "/", element: <Top /> },]);

export default router;