import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import SingleGIF from "./pages/SingleGIF";
import FavoritesPage from "./pages/FavoritesPage";
import GifProvider from "./context/context";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/:category" element={<CategoryPage />} />
      <Route path="/search/:query" element={<SearchPage />} />
      <Route path="/:type/:slug" element={<SingleGIF />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Route>,
  ),
);

function App() {
  return (
    <GifProvider>
      <RouterProvider router={router} />;
    </GifProvider>
  );
}

export default App;
