import React, { useEffect, useState, useCallback, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { switchActions } from "../../store/index";

import classes from "./Home.module.css";

import { Container, Row, Col, Card } from "react-bootstrap";

import Search from "../UI/Search";
import CardOverlay from "../UI/Card";
import HeadersCard from "../UI/HeadersCard";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";

const Home = () => {
  const inputRef = useRef();

  const dispatch = useDispatch();

  const contentState = useSelector((state) => state.showAnimeState);

  const [contentList, setContentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitValue, setSubmitValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const fetchAnimesHandler = useCallback(async () => {
    let dynamicUrl;

    if (contentState) {
      dynamicUrl = "https://api.jikan.moe/v4/anime";
    } else {
      dynamicUrl = "https://api.jikan.moe/v4/manga";
    }

    setIsLoading(true);
    try {
      const response = await fetch(dynamicUrl);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      setContentList(data.data);
    } catch (error) {
      console.log(error.message);
    }

    setIsLoading(false);
  }, [contentState]);

  useEffect(() => {
    fetchAnimesHandler();
  }, [fetchAnimesHandler]);

  const toggleContent = () => {
    dispatch(switchActions.contentSwitcher());
  };

  const searchInputHandler = (event) => {
    event.preventDefault();

    const enteredValue = inputRef.current.value;
    setSubmitValue(enteredValue);
    setInputValue("");
  };

  const nameInputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const resetFn = () => {
    setSubmitValue("");
  };

  return (
    <Container className={classes.home_container}>
      <Row className="d-flex justify-content-between">
        <Col>
          <span className={classes.headerCard_span}>
            <HeadersCard onClick={resetFn}>
              {contentState ? "Anime List" : "Manga List"}
            </HeadersCard>
          </span>
        </Col>
        <Col className={classes.switch_container}>
          <Button onClick={toggleContent}>
            {contentState ? "Switch to  Manga!" : "Switch to  Anime!"}
          </Button>
        </Col>
        <Col className={classes.search_container}>
          <Search
            onSubmit={searchInputHandler}
            onClick={searchInputHandler}
            ref={inputRef}
            onChange={nameInputChangeHandler}
            value={inputValue}
          />
        </Col>
      </Row>

      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <CardOverlay>
          <Row>
            {contentList
              .filter((val) => {
                if (submitValue === "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(submitValue.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val) => {
                return (
                  <Col className={classes.col_container} key={val.mal_id}>
                    <NavLink
                      className={classes.nav_link}
                      to={
                        contentState
                          ? `/anime-page/${val.mal_id}`
                          : `/manga-page/${val.mal_id}`
                      }
                    >
                      <Card className={classes.card_container}>
                        <Card.Body style={{ padding: "5px" }}>
                          <img
                            className={classes.card_image}
                            alt="not found"
                            src={val.images.webp.large_image_url}
                          />
                          <section className={classes.episodes}>
                            {contentState ? "Episodes: " : "Chapters: "}
                            <span className={classes.episodes_number}>
                              {contentState ? val.episodes : val.chapters}
                            </span>
                          </section>
                          <section className={classes.card_title}>
                            {val.title}
                          </section>
                          <section className={classes.card_info}>
                            {val.year && val.year + ","} {val.genres[0].name}
                          </section>
                        </Card.Body>
                      </Card>
                    </NavLink>
                  </Col>
                );
              })}
          </Row>
        </CardOverlay>
      )}
    </Container>
  );
};

export default Home;
