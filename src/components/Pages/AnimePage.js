import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import classes from "./AnimePage.module.css";
import { Container, Row, Col } from "react-bootstrap";

import RatingStars from "../UI/RatingStars";

const AnimePage = ({ anime }) => {
  const contentState = useSelector((state) => state.showAnimeState);

  if (anime.length === 0) {
    return null;
  }

  return (
    <Container className={classes.main_container}>
      <Row className={classes.row_container}>
        <img
          className="col-md-12 col-lg-5 col-sm-12"
          alt="not found"
          src={anime.images.webp.large_image_url}
        />

        <Col className={classes.col_container}>
          <NavLink to="/" className={classes.links}>
            Home
          </NavLink>
          <NavLink to="/top-animes" className={classes.links}>
            Top Anime/Manga
          </NavLink>
          <NavLink to="/recent-episodes" className={classes.links}>
            Recent Episodes
          </NavLink>
          <div className={classes.anime_name}>{anime.title}</div>
          <div className={classes.anime_info}>
            {contentState && (
              <p>
                Episodes:{" "}
                <span className={classes.api_value}>{anime.episodes}</span>
              </p>
            )}
            {!contentState && <p> Chapters: {anime.chapters}</p>}
            <p>Status: {anime.status}</p>
            {contentState && <p>Year: {anime.year}</p>}
            {!contentState && <p>Published: From {anime.published.string}</p>}
            {contentState && (
              <p>
                Studio:
                {anime.studios.map((item) => (
                  <span key={item.name}> {item.name}</span>
                ))}
              </p>
            )}
            {!contentState && (
              <p>
                Authors:
                {anime.authors.map((item) => (
                  <span key={item.name}> {item.name}</span>
                ))}
              </p>
            )}
            <p>
              Genres:
              {anime.genres.map((item) => (
                <span key={item.name}> {item.name}</span>
              ))}
            </p>
            <p>Rank: {anime.rank}</p>
            <div className={classes.rating_stars}>
              <span className={classes.rating_score}> Score: </span>
              <RatingStars value={anime.score} />
            </div>
            {contentState && <p>Rating: {anime.rating} </p>}
            {!contentState && <p>Popularity: N{anime.popularity}</p>}
          </div>
          <div className={classes.description}>{anime.synopsis}</div>
        </Col>
      </Row>
      <Row>
        {contentState && anime.trailer.url && (
          <Col>
            <iframe
              className={classes.embed}
              src={anime.trailer.embed_url}
              allowFullScreen
              title="smth"
            ></iframe>
          </Col>
        )}
        {!contentState && <section style={{ marginBottom: "50px" }}></section>}
      </Row>
    </Container>
  );
};

export default AnimePage;
