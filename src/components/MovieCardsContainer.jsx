import MovieCard from "@components/MovieCard";

const MovieCardsContainer = ({ movieListData }) => {
  return (
    <section className="grid w-fit grid-cols-1 gap-2 pb-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {movieListData?.map((movieData) => (
        <MovieCard key={movieData.id} {...movieData} />
      ))}
    </section>
  );
};
export default MovieCardsContainer;
