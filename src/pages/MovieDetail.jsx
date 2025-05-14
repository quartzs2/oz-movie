import { findByMovieId } from "@api/findByMovieId";
import Genres from "@components/ui/detail/Genres";
import { BASE_URL, LARGE_BASE_URL } from "@constants/baseUrl";
import { useFetch } from "@hooks/useFetch";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router";
import { ScaleLoader } from "react-spinners";

const MovieDetail = () => {
  const params = useParams();

  const { data, isLoading } = useFetch({
    options: { movieId: params.id },
    query: findByMovieId,
  });

  const { backdrop_path, genres, overview, poster_path, title, vote_average } = data ?? {};

  if (isLoading) {
    return (
      <div className="mt-90 flex-center flex-col">
        <ScaleLoader />
        <div>로딩 중입니다.</div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>에러 발생</div>}>
      <div className="flex w-full relative items-end justify-center">
        <div
          className="absolute top-0 left-0 z-0 h-180 w-full bg-cover"
          style={{ backgroundImage: `url(${LARGE_BASE_URL}${backdrop_path})` }}
        ></div>
        <div className="z-10 flex flex-wrap justify-center gap-4 px-4 py-18 text-white">
          <img
            alt="poster"
            className="h-[450px] w-[300px] rounded-2xl shadow-md"
            src={`${BASE_URL}${poster_path}`}
          />
          <div className="flex max-w-[500px] flex-col gap-4 rounded-xl bg-black p-8">
            <div className="text-4xl font-bold">{title}</div>
            <div>평점 : {vote_average}</div>
            <Genres genres={genres} />
            <div>{overview}</div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};
export default MovieDetail;
