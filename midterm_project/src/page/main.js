import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const bg = {
  backgroundColor: "white",
  marginTop: 10,
  marginButtom: 10,
  padding: 10,
  borderRadius: 10,
};

const colCenterd = {
  display: "flex",
  justifyContent: "center",
  alingItem: "center",
};

function main() {
  return (
    <Container style={bg}>
      <Row>
        <Col style={colCenterd}>
          <h1>Hello welcome to Main page</h1>
        </Col>
      </Row>
      <Row>
        {/* &nbsp not working with JSX need to try text indent */}
        <p style={{ textIndent: "3em" }}>
          {" "}
          &nbsp; This page was creat to learn about React with react-boothstrap
        </p>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <p>
            <b>Click section below or follow NavBar on top</b>
          </p>
          <div className="d-grid gap-2">
          <Link to="/content" className="btn btn-outline-primary">View blog content</Link>
          <Link to="/author" className="btn btn-outline-info">View author page</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default main;
