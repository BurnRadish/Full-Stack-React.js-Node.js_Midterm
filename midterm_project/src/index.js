import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';

//styles
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

//component
import Main from './page/main';
import AllContent from './page/allcontent';
import Content from './page/content';
import Author from './page/author'

ReactDOM.render(
  <>
  {/* Navbar */}
  <Navbar bg="dark" variant="dark" style={{paddingLeft : 10}}>
    <Navbar.Brand href="/">Home</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/content">Content</Nav.Link>
      <Nav.Link href="/author">Author</Nav.Link>
    </Nav>
  </Navbar>

  {/* router */}
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/content" element={<AllContent />} />
        <Route path="/content/:id" element={<Content />} />
        <Route path="/author" element={<Author />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  </>
  ,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
