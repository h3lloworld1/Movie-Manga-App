import React, { useEffect, useState, useCallback, Fragment } from "react";

import RecentEpisodes from "./RecentEpisodes";
import LoadingSpinner from "../UI/LoadingSpinner";
import Pagination from "../Pagination/Pagination";

const RecentEpisodesFetch = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [episodesPerPage, setEpisodesPerPage] = useState(10);

  const lastEpisodeIndex = currentPage * episodesPerPage;
  const firstEpisodeIndex = lastEpisodeIndex - episodesPerPage;
  const currentEpisodesPage = recommendations.slice(
    firstEpisodeIndex,
    lastEpisodeIndex
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const next = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const previous = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const recommendationsFetchHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.jikan.moe/v4/watch/episodes");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setRecommendations(data.data);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    recommendationsFetchHandler();
  }, [recommendationsFetchHandler]);

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <RecentEpisodes
          recommendations={currentEpisodesPage}
          key={recommendations.mal_id}
        />
      )}
      <Pagination
        totalQuantity={recommendations.length}
        itemsPerPage={episodesPerPage}
        currentPageState={currentPage}
        paginate={paginate}
        next={next}
        previous={previous}
      />
    </Fragment>
  );
};

export default RecentEpisodesFetch;
