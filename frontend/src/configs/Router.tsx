import Top from "../components/Top/index.tsx";
import About from "../components/Top/about.tsx";
import SignUp from "../components/Sign/SignUp.tsx";
import SignIn from "../components/Sign/SignIn.tsx";
import Menu from "../components/Main/Menu.tsx"
import AddBook from "../components/Main/AddBook.tsx"
import RegisteredBooks from "../components/Main/RegisteredBooks.tsx"
import UpdateBook from "../components/Main/UpdateBook.tsx"
import EditBook from "../components/Main/EditBook.tsx"
import DeleteBook from "../components/Main/DeleteBook.tsx"
import LookingForBooks from "../components/Main/LookingForBook.tsx"
import KindPage from "../components/Main/KindPage.tsx"
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Top /> },
  { path: "/About", element: <About /> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/SignIn", element: <SignIn /> },
  { path: "/Menu", element: <Menu /> },
  { path: "/Menu/AddBook", element: <AddBook /> },
  { path: "/Menu/RegisteredBooks", element: <RegisteredBooks /> },
  { path: "/Menu/UpdateBook", element: <UpdateBook /> },
  { path: "/Menu/UpdateBook/Edit", element: < EditBook /> },
  { path: "/Menu/DeleteBook", element: <DeleteBook /> },
  { path: "/Menu/LookingForBooks", element: <LookingForBooks /> },
  { path: "/Menu/LookingForBooks/Kinds", element: <KindPage /> },
]);

export default router;
