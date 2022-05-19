import React, { useState, useRef } from "react";

import classes from "./RecentEpisodes.module.css";

import { Container, Row, Col } from "react-bootstrap";

import Card from "../UI/Card";
import HeadersCard from "../UI/HeadersCard";
import Search from "../UI/Search";

const RecentEpisodes = ({ recommendations }) => {
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
            <HeadersCard onClick={resetFn}>Recent Episodes</HeadersCard>
          </span>
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

      {recommendations
        .filter((val) => {
          if (submitValue === "") {
            return val;
          } else if (
            val.entry.title.toLowerCase().includes(submitValue.toLowerCase())
          ) {
            return val;
          }
        })
        .map((val, i) => (
          <Card key={i}>
            <Row className="justify-content-center">
              <p className={classes.anime_name}>{val.entry.title}</p>
              <Col xs="auto" sm="auto">
                <img
                  alt="not found"
                  src={val.entry.images.webp.large_image_url}
                  height="300px"
                  width="350px"
                  className={classes.recent_image}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className={classes.anime_info}>
                  {val.episodes.map((val, i) => (
                    <section key={i}>
                      <a
                        className={classes.anime_href}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={val.url}
                      >
                        <p className={classes.episodes_container}>
                          Added new Episode:{" "}
                          <span className={classes.anime_episodes}>
                            {val.mal_id}
                          </span>
                        </p>
                      </a>
                    </section>
                  ))}
                </div>
              </Col>
            </Row>
          </Card>
        ))}
    </Container>
  );
};

export default RecentEpisodes;
