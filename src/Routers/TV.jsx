import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { tvApi } from "../api";
import { useFn, useData } from "../Components/context";
import styled from "styled-components";
import Poster from "../Components/Poster";
import Loading from "../Components/Loading";
import Message from "../Components/Message";
import Section from "../Components/Section";

const TVContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
// eslint-disable-next-line
export default () => {
  const {
    tv: { topRated, popular, airingToday },
  } = useData();
  const { setTv } = useFn();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getData() {
    try {
      if (!topRated && !popular && !airingToday) {
        setLoading(true);
        const {
          data: { results: topRated },
        } = await tvApi.topRated();
        const {
          data: { results: popular },
        } = await tvApi.popular();
        const {
          data: { results: airingToday },
        } = await tvApi.airingToday();
        setTv({
          topRated,
          popular,
          airingToday,
        });
      }
    } catch {
      setError("Network Error");
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
        <title>TV Shows | Netflix</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <TVContainer>
          {topRated && topRated.length > 0 && (
            <Section title="Top Rated Shows">
              {topRated.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {popular && popular.length > 0 && (
            <Section title="Popular Shows">
              {popular.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {airingToday && airingToday.length > 0 && (
            <Section title="Airing Today">
              {airingToday.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {error && <Message color="#e74c3c" text={error} />}
        </TVContainer>
      )}
    </>
  );
};
