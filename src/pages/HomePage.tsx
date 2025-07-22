import { useEffect } from "react";
import { useGifState } from "../context/context";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";
import GifSearch from "../components/GifSearch";
import { type MediaType } from "@giphy/js-fetch-api";
function HomePage() {
  const { gf, gifs, setGifs, filter } = useGifState();
  const fetchGifCategories = async () => {
    const { data } = await gf.trending({
      limit: 20,
      type: filter as MediaType,
      rating: "g",
    });
    setGifs(data);
  };
  useEffect(() => {
    fetchGifCategories();
  }, [filter]);
  return (
    <div>
      <GifSearch />
      <img
        src="/banner.gif"
        alt="earth banner"
        className="mt-2 rounded w-full"
      />
      <FilterGif showTrending={true} />
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif) => {
          return <Gif gif={gif} key={gif.title} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;
