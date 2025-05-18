import MovieCardSkeleton from "@components/ui/common/MovieCard/MovieCardSkeleton";

const MovieCardsContainerSkeleton = ({ size = 10 }) => {
  return (
    <section className="grid w-fit grid-cols-1 gap-2 pb-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: size }).map((_, idx) => (
        <MovieCardSkeleton key={idx} />
      ))}
    </section>
  );
};
export default MovieCardsContainerSkeleton;
