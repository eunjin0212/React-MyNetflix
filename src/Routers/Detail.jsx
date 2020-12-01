import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "../Components/Loading";
import { movieApi, tvApi } from "../api";
import { useData, useFn } from "../Components/context";
import "../static/css/Detail.css";

const DetailContainer = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;
const DetailBg = styled.div`
  background-image: url(${(props) => props.bgImage});
`;
// eslint-disable-next-line
export default function (props) {
  const {
    location: { pathname },
    match: {
      params: { id },
    },
    history: { push },
  } = props;

  const { details } = useData();
  const { setDetails } = useFn();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMovie = pathname.includes("/movie/");

  async function getData() {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    try {
      let filter = [];
      let result = null;
      if (details.length !== 0) {
        filter = details.filter((item) => item.id === parsedId);
        result = filter[0];
      }

      if (filter.length === 0 && isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
      } else if (filter.length === 0) {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }

      setResult(result);

      if (filter.length === 0) {
        const data = [...details, result];
        setDetails(data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <>
      <Loading />
    </>
  ) : (
    <DetailContainer>
      <DetailBg
        className="detail-backdrop"
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />

      <div className="detail-container">
        <div className="detail-data">
          <h3 className="detail-title">
            {result.original_title
              ? result.original_title
              : result.original_name}
          </h3>
          <div className="detail-itemBox">
            <span>
              {result.release_date
                ? result.release_date
                : result.first_air_date}
            </span>
            <span className="detail-dots">|</span>
            <span>
              {result.runtime === null
                ? ""
                : result.runtime
                ? result.runtime
                : result.episode_run_time[0]}{" "}
              min
            </span>
            <span> | </span>
            <span>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name}  |  `
                )}
            </span>
            <span className="detail-dots">{result.seasons ? null : " | "}</span>
          </div>
          <p className="detail-overview">{result.overview}</p>
        </div>
        <div className="detail-poster_container">
          <img
            className="detail-poster_image"
            alt="image"
            src={`https://image.tmdb.org/t/p/w300${result.poster_path}`}
          />
        </div>
      </div>
    </DetailContainer>
  );
}
