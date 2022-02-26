import "../App.css";
import { Container, Card, Badge, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function AllContent() {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState([]);
  const [categorie, setCategories] = useState([]);
  useEffect(() => {
    async function load() {
      const getPost = await fetch(
        "https://fswd-wp.devnss.com/wp-json/wp/v2/posts"
      );
      if (!getPost.ok) {
        return "Can't found post data!!!";
      }

      const getAuthor = await fetch(
        "https://fswd-wp.devnss.com/wp-json/wp/v2/users"
      );
      if (!getPost.ok) {
        return "Can't found author data!!!";
      }

      const getCag = await fetch(
        "https://fswd-wp.devnss.com/wp-json/wp/v2/categories"
      );
      if (!getPost.ok) {
        return "Can't found cagtegory data!!!";
      }

      const posts = await getPost.json();
      const author = await getAuthor.json();
      const category = await getCag.json();

      setPosts(posts);
      setAuthor(author);
      setCategories(category);

      console.log(posts);
      console.log(author);
      console.log(category);
    }

    load();
  }, []);

  function authorName(id) {
    let recol = [];
    for (var i = 0; i < author.length; i++) {
      if (id === author[i].id) {
        recol = (
          <Card.Subtitle class="mb-2 text-muted">
            Written by : {author[i].name}
          </Card.Subtitle>
        );
      }
    }
    return recol;
  }

  function sortPost(tag){
    console.log(tag)
    let result = [];
    for (var i=0; i <posts.length; i++){
      console.log(posts[i].categories)
      if(posts[i].categories.includes(tag)){
        result.push(
          <Card style={box}>
                  <Card.Body style={{ width: "100%" }}>
                    <Card.Title
                      style={{ fontSize: "46px" }}
                      dangerouslySetInnerHTML={{ __html: posts[i].title.rendered }}
                    ></Card.Title>
                    {authorName(posts[i].author)}
                    <Card.Text
                      dangerouslySetInnerHTML={{
                        __html: posts[i].excerpt.rendered,
                      }}
                    ></Card.Text>
                    <Link to={"/content/" + posts[i].id} className="btn btn-primary">
                      Read Full Content click here
                    </Link>
                  </Card.Body>
                </Card>
        )
      }
    }
    return result;
  }

  //styles
  const box = {
    margin: "10px",
    padding: "5px",
  };

  return (
    <Container fluid>
      <h1>
        Post Section <Badge bg="danger">HOT</Badge>
      </h1>
      <Tabs
        defaultActiveKey="Category"
        className="mb-3"
        transition={true}
        variant='tabs'
      >
        {categorie.map((tag, index) => (
          <Tab eventKey={tag.name} title={tag.name} key={index}>
            <div>
              {sortPost(tag.id)}  
            </div>
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
}

export default AllContent;
