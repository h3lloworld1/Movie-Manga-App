import React, { useEffect, useState, useCallback, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import AnimePage from "./AnimePage";
import LoadingSpinner from "../UI/LoadingSpinner";

const AnimePageAPI = () => {
  const contentState = useSelector((state) => state.showAnimeState);

  const [singleAnime, setsingleAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let { id } = useParams();

  const fetchAnimesHandler = useCallback(async () => {
    let dynamicUrl;

    if (contentState) {
      dynamicUrl = `https://api.jikan.moe/v4/anime/${id}`;
    } else {
      dynamicUrl = `https://api.jikan.moe/v4/manga/${id}`;
    }

    setIsLoading(true);
    try {
      const response = await fetch(dynamicUrl);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setsingleAnime(data.data);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  }, [contentState]);

  useEffect(() => {
    fetchAnimesHandler();
  }, [fetchAnimesHandler]);

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && <AnimePage anime={singleAnime} key={singleAnime.mal_id} />}
    </Fragment>
  );
};

export default AnimePageAPI;
