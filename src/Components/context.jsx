import React, { useState, useContext } from "react";

const DefaultContext = React.createContext();

const DefaultContextProvider = ({ children }) => {
  const [movie, setMovies] = useState({
    nowPlaying: null,
    upcoming: null,
    popular: null,
  });
  const [tv, setTv] = useState({
    topRated: null,
    popular: null,
    airingToday: null,
  });
  const [details, setDetails] = useState([]);

  return (
    <DefaultContext.Provider
      value={{
        data: { movie, tv, details },
        fn: { setMovies, setTv, setDetails },
      }}
    >
      {children}
    </DefaultContext.Provider>
  );
};

export const useData = () => {
  const { data } = useContext(DefaultContext);
  return data;
};
export const useFn = () => {
  const { fn } = useContext(DefaultContext);
  return fn;
};

export default DefaultContextProvider;
