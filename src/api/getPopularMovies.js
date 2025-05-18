export const getPopularMovies = async ({ config, pageNumber }) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${pageNumber}`,
    config
  );

  if (!response.ok) {
    throw Error("오류가 발생했습니다.");
  }

  return response;
};
