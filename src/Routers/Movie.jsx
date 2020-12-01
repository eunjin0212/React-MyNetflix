import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { movieApi } from "../api";
import { useFn, useData } from "../Components/context";
import styled from "styled-components";
import Poster from "../Components/Poster";
import Loading from "../Components/Loading";
import Message from "../Components/Message";
import Section from "../Components/Section";

const MovieContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
// eslint-disable-next-line
export default function () {
  const {
    movie: { nowPlaying, upcoming, popular },
  } = useData();
  const { setMovies } = useFn();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getData() {
    try {
      if (!nowPlaying && !upcoming && !popular) {
        setLoading(true);
        const {
          data: { results: nowPlaying },
        } = await movieApi.nowPlaying();
        const {
          data: { results: upcoming },
        } = await movieApi.upcoming();
        const {
          data: { results: popular },
        } = await movieApi.popular();
        setMovies({
          nowPlaying,
          upcoming,
          popular,
        });
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Loading | Netflix</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <MovieContainer>
          <Helmet>
            <title>Movies | Netflix</title>
          </Helmet>
          {nowPlaying && nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {nowPlaying.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {upcoming && upcoming.length > 0 && (
            <Section title="Upcoming Movies">
              {upcoming.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {popular && popular.length > 0 && (
            <Section title="Popular Movies">
              {popular.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {error && <Message color="#e74c3c" text={error} />}
        </MovieContainer>
      )}
    </>
  );
}
