import MovieCard from "@components/ui/common/MovieCard/MovieCard";
import MovieCardSkeleton from "@components/ui/common/MovieCard/MovieCardSkeleton";

const MovieCardsContainer = ({ isLoading = false, movieListData, skeletonSize = 10 }) => {
  return (
    <section className="grid w-fit grid-cols-1 gap-2 pb-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {movieListData?.map((movieData) => (
        <MovieCard key={movieData.id} {...movieData} />
      ))}
      {isLoading &&
        Array.from({ length: skeletonSize }).map((_, idx) => <MovieCardSkeleton key={idx} />)}
    </section>
  );
};
export default MovieCardsContainer;
