export const findByMovieId = async ({ config, movieId }) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    config,
  );

  if (!response.ok) {
    throw Error("오류가 발생했습니다.");
  }

  return response;
};
