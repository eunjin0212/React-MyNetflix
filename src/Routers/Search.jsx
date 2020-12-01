import React, { useState } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

import Loading from "../Components/Loading";
import Section from "../Components/Section";
import Message from "../Components/Message";
import Poster from "../Components/Poster";

import { movieApi, tvApi } from "../api";

const SearchContainer = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;
// eslint-disable-next-line
export default () => {
  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm !== "") {
      searchByTerm();
    }
  };

  const updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    setSearchTerm(value);
  };

  const searchByTerm = async () => {
    setLoading(true);
    try {
      const {
        data: { results: movieResults },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      setMovieResults(movieResults);
      setTvResults(tvResults);
    } catch {
      setError("Can't find results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContainer>
      <Helmet>
        <title>Search | Netflix</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search Movies or TV Shows..."
          value={searchTerm}
          onChange={updateTerm}
        />
      </Form>
      {loading ? (
        <Loading />
      ) : (
        <>
          {movieResults && movieResults.length > 0 && (
            <Section title="Movie Results">
              {movieResults.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {tvResults && tvResults.length > 0 && (
            <Section title="TV Show Results">
              {tvResults.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date}
                />
              ))}
            </Section>
          )}
          {error && <Message color="#e74c3c" text={error} />}
          {tvResults &&
            movieResults &&
            tvResults.length === 0 &&
            movieResults.length === 0 && (
              <Message text="Nothing found" color="#95a5a6" />
            )}
        </>
      )}
    </SearchContainer>
  );
};
