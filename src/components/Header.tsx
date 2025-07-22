import { useEffect, useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useGifState } from "../context/context";
import type { ICategory } from "@giphy/js-fetch-api";
function Header() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showCategories, setShowCategories] = useState(false);
  const { gf, favorites } = useGifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };
  useEffect(() => {
    fetchGifCategories();
  }, []);
  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/">
          <img src="logo.svg" className="w-8" alt="Giphy Logo" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GIPHY
          </h1>
        </Link>
        <div className="font-bold text-md flex gap-2 itmes-center">
          {categories?.slice(0, 5).map((c) => {
            return (
              <Link
                to={`/${c.name_encoded}`}
                className="px-4 py-1 hover:bg-gradient-to-r hover:from-teal-600 via-blue-600 to-pink-600 border-b-4 hidden lg:block"
              >
                {c.name}
              </Link>
            );
          })}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              className={`py-0.5 hover:bg-gradient-to-r ${showCategories ? "gradient" : ""} hover:from-teal-600 via-blue-600 to-pink-600  border-b-4 hidden lg:block`}
              size={35}
            />
          </button>
          {favorites.length > 0 && (
            <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
              <Link to="/favorites">Favorite GIFs</Link>
            </div>
          )}
          <button>
            <HiMiniBars3BottomRight
              className="text-sky-400 block lg:hidden"
              size={35}
            />
          </button>
        </div>

        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((c) => {
                return (
                  <Link to={`/${c.name_encoded}`} className="font-bold">
                    {c.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
