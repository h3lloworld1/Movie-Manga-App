import React, { useEffect, useState, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { switchActions } from "../../store/index";

import Container from "react-bootstrap/Container";

import TopAnimes from "./TopAnimes";
import LoadingSpinner from "../UI/LoadingSpinner";
import Pagination from "../Pagination/Pagination";

const TopAnimesFetch = () => {
  const dispatch = useDispatch();

  const contentState = useSelector((state) => state.showAnimeState);
  const [contentTopList, setContentTopList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [animesPerPage, setAnimesPerPage] = useState(10);

  const lastIndex = currentPage * animesPerPage;
  const firstIndex = lastIndex - animesPerPage;
  const currentAnimesPage = contentTopList.slice(firstIndex, lastIndex);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const next = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const previous = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const topAnimesFetchHandler = useCallback(async () => {
    let dynamicUrl;

    if (contentState) {
      dynamicUrl = `https://api.jikan.moe/v4/top/anime`;
    } else {
      dynamicUrl = "https://api.jikan.moe/v4/top/manga";
    }
    setIsLoading(true);
    try {
      const response = await fetch(dynamicUrl);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setContentTopList(data.data);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  }, [contentState]);

  useEffect(() => {
    topAnimesFetchHandler();
  }, [topAnimesFetchHandler]);

  const switchHandlerFunction = () => {
    dispatch(switchActions.contentSwitcher());
  };

  return (
    <Container style={{ padding: "0px" }}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <TopAnimes
          contentTopList={currentAnimesPage}
          onClick={switchHandlerFunction}
        />
      )}
      <Pagination
        totalQuantity={contentTopList.length}
        itemsPerPage={animesPerPage}
        currentPageState={currentPage}
        next={next}
        previous={previous}
        paginate={paginate}
      />
    </Container>
  );
};

export default TopAnimesFetch;
