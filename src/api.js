import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "10923b261ba94d897ac6b81148314a3f",
    language: "ko",
    region: "kr",
  },
});

export const movieApi = {
  latest: () => api.get("movie/latest"),
  popular: () => api.get("movie/popular"),
  topRated: () => api.get("movie/top_rated"),
  upcoming: () => api.get("movie/upcoming"),
  nowPlaying: () => api.get("movie/now_playing"),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/movie", {
      params: {
        //query : 저장되어 있는 정보를 필터하기 위한 질문
        query: encodeURIComponent(term),
        // encodeURIComponent : URI의 특정한 문자를 UTF-8로 인코딩해 하나, 둘, 셋, 혹은 네 개의 연속된 이스케이프 문자로 나타냅니다.
      },
    }),
};

export const tvApi = {
  latest: api.get("tv/latest"),
  airingToday: api.get("tv/airing_today"),
  popular: api.get("tv/popular"),
  topRated: api.get("tv/top_rated"),
  onTheAir: api.get("tv/on_the_air"),
  tvShowDetail: (id) => {
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    });
  },
  search: (term) =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};
