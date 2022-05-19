import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import classes from "./Reviews.module.css";
import ReadMore from "../UI/ReadMore";
import RatingStars from "../UI/RatingStars";

import HeadersCard from "../UI/HeadersCard";
import Card from "../UI/Card";
import Button from "../UI/Button";

const Reviews = ({ recentReviews, onClick }) => {
  const contentState = useSelector((state) => state.showAnimeState);
  return (
    <Container className={classes.main_container}>
      <div className="d-flex justify-content-between">
        <HeadersCard>
          {contentState ? "Recent Anime Reviews" : "Recent Manga Reviews"}
        </HeadersCard>
        <Button onClick={onClick}>
          {contentState ? "Switch to Manga Reviews" : "Switch to Anime Reviews"}
        </Button>
      </div>
      {recentReviews.map((item) => (
        <Card key={item.mal_id}>
          <Row>
            <Col className={classes.image_container} xl={2}>
              <img
                className={classes.image}
                src={item.entry.images.webp.image_url}
                width="170px"
                height="187"
                alt="not found"
              />
            </Col>
            <Col xl={6}>
              <p className={classes.anime_name}>{item.entry.title}</p>
              <section className={classes.review_container}>
                <p className={classes.user}>
                  <span className={classes.user_dummy}>User:</span>
                  <img
                    src={item.user.images.webp.image_url}
                    style={{ borderRadius: "50%" }}
                    height="25px"
                    alt="not found"
                  />{" "}
                  {item.user.username}
                </p>
                <div className={classes.user_review}>
                  <ReadMore>{item.review}</ReadMore>
                </div>
              </section>
            </Col>
            <Col className={classes.ratings_col} xl={4}>
              <div className="d-flex flex-column">
                <div style={{ marginTop: "39px" }} className="p-2">
                  <section className={classes.rating_stars}>
                    <span className={classes.ratings_text}>
                      {" "}
                      {contentState ? "Animation:" : "Art"}{" "}
                    </span>
                    {contentState && (
                      <RatingStars value={item.scores.animation} />
                    )}
                    {!contentState && <RatingStars value={item.scores.art} />}
                  </section>
                </div>
                <div className="p-2">
                  <section className={classes.rating_stars}>
                    <span className={classes.ratings_text}> Story: </span>
                    <RatingStars value={item.scores.story} />
                  </section>
                </div>
                <div className="p-2">
                  <section className={classes.rating_stars}>
                    <span className={classes.ratings_text}> Overall: </span>
                    <RatingStars value={item.scores.overall} />
                  </section>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
};

export default Reviews;
