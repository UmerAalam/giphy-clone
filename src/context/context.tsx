import { GiphyFetch, type MediaType } from "@giphy/js-fetch-api";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { type IGIF } from "@giphy/js-fetch-api";
export interface GifContextType {
  gf: GiphyFetch;
  gifs: IGIF[];
  setGifs: Dispatch<SetStateAction<never[]>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<MediaType>>;
  favorites: MediaType[];
  setFavorites: (favorites: MediaType[]) => void;
  addToFavorites: (id: MediaType) => void;
}
const GifContext = createContext<GifContextType | null>(null);

interface Props {
  children: ReactNode;
}

const API_KEY = import.meta.env.VITE_GIPHY_KEY || "";
if (!API_KEY) {
  throw new Error("VITE_GIPHY_KEY is not defined in environment variables");
}

const GifProvider = ({ children }: Props) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState<MediaType>("gifs");
  const [favorites, setFavorites] = useState<MediaType[]>([]);
  const addToFavorites = (id: MediaType) => {
    if (favorites.includes(id)) {
      const updatedFavorites = favorites.filter((itemId) => itemId !== id);
      localStorage.setItem("favoritesGIFs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.push(id);
      localStorage.setItem("favoritesGIFs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoritesGIFs") || "[]");
    setFavorites(favorites);
  }, []);
  const gf = new GiphyFetch(API_KEY);
  return (
    <GifContext.Provider
      value={{
        gf,
        gifs,
        setGifs,
        filter,
        setFilter,
        favorites,
        setFavorites,
        addToFavorites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const useGifState = () => {
  const context = useContext(GifContext);
  if (!context) {
    throw new Error("useGifState must be used within a GifProvider");
  }
  return context;
};

export default GifProvider;
