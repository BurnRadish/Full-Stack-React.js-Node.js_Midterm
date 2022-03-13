import { Col, Container, Row, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";

function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    async function load() {
      const getAuthors = await fetch(
        "https://fswd-wp.devnss.com/wp-json/wp/v2/users"
      );
      if (!getAuthors.ok) {
        return "Can't found author data!!!";
      }

      const authors = await getAuthors.json();

      setAuthors(authors);

      console.log(authors);
    }

    load();
  }, []);

  //styles
  const boxbg = {
    backgroundColor: "white",
    marginTop: 10,
    marginButtom: 10,
    padding: 10,
    borderRadius: 10,
  };

  const centerImg = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
  };

  return (
    <Container style={boxbg}>
      <h1>Authors</h1>
      <Row>
        {authors.map((data, index) => (
          <Col md="auto" key={index}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <img
                  style={centerImg}
                  src={data.avatar_urls[96]}
                  class="rounded-circle"
                  alt="Avatar image"
                ></img>
                <Card.Title>{data.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {data.slug}
                </Card.Subtitle>
                <Card.Text>
                  {/* decoy */}
                  description for author.
                {data.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Authors;
