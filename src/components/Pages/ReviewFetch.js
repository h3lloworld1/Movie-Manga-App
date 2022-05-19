import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { switchActions } from "../../store/index";

import Container from "react-bootstrap/Container";

import Pagination from "../Pagination/Pagination";
import Reviews from "./Reviews";
import LoadingSpinner from "../UI/LoadingSpinner";

const ReviewFetch = () => {
  const contentState = useSelector((state) => state.showAnimeState);
  const dispatch = useDispatch();

  const [recentReviews, setRecentReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage, setReviewsPerPage] = useState(10);

  const lastReviewIndex = currentPage * reviewsPerPage;
  const firstReviewIndex = lastReviewIndex - reviewsPerPage;
  const currentReviewPage = recentReviews.slice(
    firstReviewIndex,
    lastReviewIndex
  );

  const previousPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const nextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const fetchRecentReviews = useCallback(async () => {
    let dynamicUrl;

    if (contentState) {
      dynamicUrl = "https://api.jikan.moe/v4/reviews/anime";
    } else {
      dynamicUrl = "https://api.jikan.moe/v4/reviews/manga";
    }

    setIsLoading(true);

    try {
      const response = await fetch(dynamicUrl);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setRecentReviews(data.data);
    } catch (error) {
      console.log(error.message);
    }

    setIsLoading(false);
  }, [contentState]);

  useEffect(() => {
    fetchRecentReviews();
  }, [fetchRecentReviews]);

  const switchHandlerFunction = () => {
    dispatch(switchActions.contentSwitcher());
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container style={{ padding: "0px" }}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Reviews
          recentReviews={currentReviewPage}
          onClick={switchHandlerFunction}
        />
      )}
      <Pagination
        totalQuantity={recentReviews.length}
        itemsPerPage={reviewsPerPage}
        paginate={paginate}
        previous={previousPage}
        next={nextPage}
        currentPageState={currentPage}
      />
    </Container>
  );
};

export default ReviewFetch;
