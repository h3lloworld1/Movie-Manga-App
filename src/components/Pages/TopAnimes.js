import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../UI/Button";
import HeadersCard from "../UI/HeadersCard";
import Card from "../UI/Card";
import RatingStars from "../UI/RatingStars";
import Search from "../UI/Search";

import classes from "./TopAnimes.module.css";
import { Container, Row, Col } from "react-bootstrap";

const TopAnimes = ({ contentTopList, onClick }) => {
  const contentState = useSelector((state) => state.showAnimeState);

  const [enteredInput, setEnteredInput] = useState("");
  const [submitValue, setSubmitValue] = useState("");

  const inputRef = useRef();

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredValue = inputRef.current.value;

    setSubmitValue(enteredValue);
    setEnteredInput("");
  };

  const resetFn = () => {
    setSubmitValue("");
  };

  return (
    <Container className={classes.main_container}>
      <Row className="d-flex justify-content-between">
        <Col>
          <span className={classes.headerCard_span}>
            <HeadersCard onClick={resetFn}>
              {contentState ? "Anime List" : "Manga List"}
            </HeadersCard>
          </span>
        </Col>
        <Col className={classes.switch_container}>
          <Button onClick={onClick}>
            {contentState ? "Switch to  Manga!" : "Switch to  Anime!"}
          </Button>
        </Col>
        <Col className={classes.search_container}>
          <Search
            ref={inputRef}
            onChange={inputChangeHandler}
            onClick={submitHandler}
            onSubmit={submitHandler}
            value={enteredInput}
          />
        </Col>
      </Row>
      {contentTopList
        .filter((val) => {
          if (submitValue === "") {
            return val;
          } else if (
            val.title.toLowerCase().includes(submitValue.toLowerCase())
          ) {
            return val;
          }
        })
        .map((val) => (
          <Card key={val.mal_id}>
            <Row>
              <Col lg={5}>
                <NavLink
                  className={classes.nav_link}
                  to={
                    contentState
                      ? `/anime-page/${val.mal_id}`
                      : `/manga-page/${val.mal_id}`
                  }
                >
                  <img
                    alt="not found"
                    src={val.images.webp.large_image_url}
                    width="100%"
                  />
                </NavLink>
              </Col>
              <Col md={12} lg={5}>
                <p className={classes.anime_name}>{val.title}</p>
                <section className={classes.rating_stars}>
                  <span className={classes.rating_text}>Score:</span>
                  <RatingStars value={val.score} />
                </section>
                <section className={classes.info}>
                  <p>
                    Scored By :{" "}
                    <span className={classes.api_values}>
                      {val.scored_by + " Users"}
                    </span>
                  </p>
                </section>
                <p className={classes.anime_description}>{val.synopsis}</p>
              </Col>
              <Col md={12} lg={2}>
                <p className={classes.rank}>
                  <span className={classes.rank_badge}>#{val.rank}</span>
                </p>
              </Col>
            </Row>
          </Card>
        ))}
    </Container>
  );
};

export default TopAnimes;
