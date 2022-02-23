import '../App.css';
import {Container} from 'react-bootstrap'
import React, { useEffect, useState } from 'react'

function Content() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
      async function loadPosts() {
          const response = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/posts');
          if(!response.ok) {
              // oups! something went wrong
              return;
          }
  
          const posts = await response.json();
          setPosts(posts);
          console.log(posts)
      }
  
      loadPosts();
 }, [])

 const box = {
  margin: "10px",
  padding: '5px',
  border: '1px solid black',
};

return (
  <Container>
    {posts.map(data =>(
      <div style={box}>
        <h2 dangerouslySetInnerHTML={{__html: data.title.rendered}}></h2>
      <p dangerouslySetInnerHTML={{__html: data.content.rendered}}></p>
      </div>
      
    ))}
  </Container>
);
}

export default Content;
