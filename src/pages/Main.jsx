import { getPopularMovies } from "@api/getPopularMovies";
import MovieCardsContainer from "@components/ui/common/MovieCard/MovieCardsContainer";
import { useFetch } from "@hooks/useFetch";
import useIntersect from "@hooks/useIntersect";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

function Main() {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const { data: newData, isLoading } = useFetch({
    options: { pageNumber: pageNumber },
    query: getPopularMovies,
  });

  useEffect(() => {
    if (newData?.results) {
      const allAgesMovieList = newData?.results.filter((movie) => !movie.adult);

      setMovies((prevMovies) => {
        const existingMovieIds = new Set(prevMovies.map((movie) => movie.id));
        const nonDuplicatedMovies = allAgesMovieList.filter(
          (movie) => !existingMovieIds.has(movie.id)
        );
        return [...prevMovies, ...nonDuplicatedMovies];
      });
    }
  }, [newData?.results]);

  const ref = useIntersect({
    onIntersect: async (entry, observer) => {
      observer.unobserve(entry.target);
      if (!isLoading) {
        setPageNumber((prev) => prev + 1);
      }
    },
  });

  return (
    <ErrorBoundary fallback={<div>에러 발생</div>}>
      <div className="flex flex-col gap-8 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-full">
        <div>
          <h2 className="h2 relative left-1">인기 영화</h2>
          <MovieCardsContainer isLoading={isLoading} movieListData={movies} />
          <Target ref={ref} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

function Target({ ref }) {
  return <div className="h-[1px]" ref={ref}></div>;
}

export default Main;
