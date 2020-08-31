import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import './Posts.css'

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    let token = window.localStorage.getItem("token");

    let addPost = (postBody) => {
      fetch('http://localhost:8080/posts', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-authorization-token': token,
            },
            body: JSON.stringify({
              postBody: postBody,
            })
          }).then(res => res.json())
            .then(response => {
              setPosts([...posts, response])
          });  
    }

    let handleSubmit = event => {
      event.preventDefault();
      addPost(event.target.postBody.value);
      event.target.postBody.value = "";
    } 

    useEffect(() => {
        fetch("http://localhost:8080/posts", {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
               'x-authorization-token': window.localStorage.getItem('token')
            }
            }).then(res => res.json())
            .then(
                (result) => {
                setIsLoaded(true);
                setPosts(result);
                },
                (error) => {
                setIsLoaded(true);
                setError(error);
                }
            )
            }, []);

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <>
          <div className="center-screen">
            <div className="add-post">
              <Form onSubmit={handleSubmit}>
                <div className="text-area">
                  <Form.Group controlId="postBody">
                    <Form.Label>Write something</Form.Label>
                    <Form.Control as="textarea" name="postBody" rows="4"  />
                  </Form.Group>
                </div>
                  <Button type="submit" className="submit">
                    Add Post
                  </Button>
              </Form>
            </div>
            <ul>
              {posts.map(p => (
                <div className="col" key={p.id}>
                <Card className="card" border='primary'>
                <Card.Body className="card-body text-left">
                  <Card.Title className="card-title text-left">
                    {p.user.username}
                  </Card.Title>
                    <Card.Text>
                      {p.postBody}
                    </Card.Text>
                  <Card.Link href="/#">Like</Card.Link>
                  <Card.Link href="/#">Add Comment</Card.Link>
                  <Card.Link href="/#">Share</Card.Link>
                </Card.Body>
                </Card> 
                </div>           
              ))}
            </ul>
          </div>
          </>
        );
      }
    }