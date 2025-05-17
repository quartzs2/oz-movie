import { getPopularMovies } from "@api/getPopularMovies";
import MovieCardsContainer from "@components/ui/common/MovieCard/MovieCardsContainer";
import MovieCardsContainerSkeleton from "@components/ui/common/MovieCard/MovieCardsContainerSkeleton";
import { useFetch } from "@hooks/useFetch";
import { ErrorBoundary } from "react-error-boundary";

function Main() {
  const { data, isLoading } = useFetch({
    query: getPopularMovies,
  });

  if (isLoading) {
    return <MovieCardsContainerSkeleton />;
  }

  const allAgesMovieList = data?.results.filter((movie) => !movie.adult);

  return (
    <ErrorBoundary fallback={<div>에러 발생</div>}>
      <div className="flex flex-col gap-8 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-full">
        <div>
          <h2 className="h2 relative left-1">인기 영화</h2>
          {data?.results && <MovieCardsContainer movieListData={allAgesMovieList} />}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Main;
