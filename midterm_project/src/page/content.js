import { Container, Card, } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import React, { useEffect, useState } from "react";

function Content() {
  let params = useParams();
  const [post, setPosts] = useState([]);
  const [author, setAuthor] = useState([]);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    async function load() {
      const getPost = await fetch(
        "https://fswd-wp.devnss.com/wp-json/wp/v2/posts/" + parseInt(params.id)
      );
      if (!getPost.ok) {
        return "Can't found post data!!!";
      }

      const getAuthor = await fetch(
        "https://fswd-wp.devnss.com/wp-json/wp/v2/users"
      );
      if (!getAuthor.ok) {
        return "Can't found author data!!!";
      }

      const getComment = await fetch(
        "https://fswd-wp.devnss.com/wp-json/wp/v2/comments"
      );
      if (!getComment.ok) {
        return "Can't found comment data!!!";
      }

      const post = await getPost.json();
      const author = await getAuthor.json();
      const comment = await getComment.json();

      setPosts(post);
      setAuthor(author);
      setComment(comment);
      console.log(post);
      console.log(author);
      console.log(comment);
    }

    load();
  }, [params]);

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

  //styles
  const box = {
    margin: "10px",
    padding: "5px",
  };

  return (
    <Container fluid>
      <div style={box}>
        <Card>
          <Card.Body style={{ width: "100%" }}>
            <Card.Title
              style={{ fontSize: "46px" }}
              dangerouslySetInnerHTML={{ __html: post?.title?.rendered }}
            ></Card.Title>
            {authorName(post.author)}
            <Card.Text
              dangerouslySetInnerHTML={{ __html: post?.content?.rendered }}
            ></Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>
        <h2>Comment</h2>
        <div class='row' style={box}>
          {comment.map((data, index) => {
          if (data.post === post.id) {
            return (
              <div class='col-md-6'>
                <Card border="secondary" style={{ width: "100%" }}>
                  <Card.Header>
                    <div class="row">
                      <div class="col-auto">
                        <img
                          src={data.author_avatar_urls[24]}
                          class="rounded-circle"
                          alt="Avatar image"
                        ></img>
                      </div>
                      <div class='col'> 
                      <h4>{data.author_name}</h4>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{data.date.substring(0, data.date.length - 9)}</Card.Title>
                    <Card.Text dangerouslySetInnerHTML={{ __html: data?.content?.rendered }}>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          }
        })}
        </div>
        
      </div>
      <Link to={"/content"} className="btn btn-primary">
        Back to post
      </Link>
    </Container>
  );
}

export default Content;
