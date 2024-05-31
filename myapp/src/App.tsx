import { RouterProvider } from "react-router-dom";
import router from "./configs/Router.tsx";

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
