import { findByMovieTitle } from "@api/findByMovieTitle";
import { getPopularMovies } from "@api/getPopularMovies";
import MovieCardsContainer from "@components/MovieCardsContainer";
import { MAIN_URL } from "@constants/urls";
import { useFetch } from "@hooks/useFetch";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate, useSearchParams } from "react-router";

function Main() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlQuery = searchParams.get("query");

  useEffect(() => {
    if (searchParams.has("query") && !urlQuery) {
      navigate(MAIN_URL);
    }
  }, [navigate, searchParams, urlQuery]);

  const { data: searchResults, isLoading: searchIsLoading } = useFetch({
    enabled: urlQuery,
    options: { query: urlQuery },
    query: findByMovieTitle,
  });

  const { data: popularMovies, isLoading: popularIsLoading } = useFetch({
    enabled: !urlQuery,
    query: getPopularMovies,
  });

  const data = searchResults || popularMovies;
  const isLoading = searchIsLoading || popularIsLoading;

  if (isLoading) {
    return <div>로딩 중입니다</div>;
  }

  const allAgesMovieList = data?.results.filter((movie) => !movie.adult);

  return (
    <ErrorBoundary fallback={<div>에러 발생</div>}>
      <div className="flex flex-col gap-8 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-full">
        <div>
          <h2 className="h2 relative left-1">{urlQuery ? "검색 결과" : "인기 영화"}</h2>
          {data?.results && <MovieCardsContainer movieListData={allAgesMovieList} />}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Main;
