export const findByMovieTitle = async ({ config, query }) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko-KR&page=1`,
    config,
  );

  if (!response.ok) {
    throw Error("오류가 발생했습니다.");
  }

  return response;
};
