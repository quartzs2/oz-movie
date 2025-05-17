import { findByMovieTitle } from "@api/findByMovieTitle";
import MovieCardsContainer from "@components/ui/common/MovieCard/MovieCardsContainer";
import MovieCardsContainerSkeleton from "@components/ui/common/MovieCard/MovieCardsContainerSkeleton";
import { useFetch } from "@hooks/useFetch";
import { ErrorBoundary } from "react-error-boundary";
import { useSearchParams } from "react-router";

const Search = () => {
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get("query");

  const { data, isLoading } = useFetch({
    options: { query: urlQuery },
    query: findByMovieTitle,
  });

  return (
    <ErrorBoundary fallback={<div>에러 발생</div>}>
      <div className="flex flex-col gap-8 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-full">
        <div className="flex flex-col items-center gap-2">
          <div className="font-extralight text-4xl">
            {urlQuery ? urlQuery : "검색어가 없습니다"}
          </div>
          <h2 className="h2 relative font-medium">{urlQuery && "검색 결과"}</h2>
        </div>
        <div>
          {isLoading ? (
            <MovieCardsContainerSkeleton />
          ) : (
            data?.results && <MovieCardsContainer movieListData={data.results} />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};
export default Search;
