import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import classes from "./Magazines.module.css";

import Card from "../UI/Card";
import HeadersCard from "../UI/HeadersCard";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";

const Magazines = () => {
  const [magazines, setMagazines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMagazines = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://api.jikan.moe/v4/magazines");
        const data = await response.json();

        setMagazines(data.data);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    fetchMagazines();
  }, []);

  return (
    <Container className={classes.main_container}>
      <HeadersCard>Magazines</HeadersCard>
      {isLoading && <LoadingSpinner />}
      {magazines.map((item) => (
        <Card key={item.mal_id}>
          <div className={classes.magazine_container}>
            <p className={classes.magazine_name}>{item.name}</p>
            <a
              className={classes.link}
              target="_blank"
              rel="noopener noreferrer"
              href={item.url}
            >
              <Button>
                <span className={classes.url_text}>Go to Magazine</span>
              </Button>
            </a>
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default Magazines;
