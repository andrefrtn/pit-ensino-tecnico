import { Routes, Route } from "react-router-dom";
import { Feed } from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import { UpdatePost } from "./pages/UpdatePost";
import { OnePost } from "./pages/OnePost";
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Land from './pages/Landpage/land';
import useAuth from "./hooks/useAuth";

const Private = ({ Item }) => {
  const { signed } = useAuth();
  return signed ? <Item /> : <Login />;
};

export function Router() {
  return (
    <Routes>
<Route path="/" element={<Land />} />
<Route path="/feed" element={<Feed />} />
      <Route path="/createPost" element={<CreatePost />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/updatePost/:id" element={<UpdatePost />} />
      <Route path="/post/:id" element={<OnePost />} />
    </Routes>
  );
}
