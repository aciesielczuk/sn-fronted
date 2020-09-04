import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

import './Posts.css'

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const token = window.localStorage.getItem("token");
    const userId = window.localStorage.getItem("userId");

    const addPost = (postBody) => {
      fetch(process.env.REACT_APP_API + '/posts', {
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

    const handleSubmit = event => {
      event.preventDefault();
      addPost(event.target.postBody.value);
      event.target.postBody.value = "";
    }

    const likePost = (postId) => {
      fetch(process.env.REACT_APP_API + '/likes', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-authorization-token': token,
              'postId': postId,
            }
          }).then(res => res.json())
            .then(response => {
              let postIndex = posts.findIndex((post) => post.id === response.post.id);
              setPosts((prevPosts) => {
              prevPosts[postIndex] = {...prevPosts[postIndex], ...response.post}
              return [...prevPosts];
            })
          });  
    }

    const unlikePost = (postId) => {
      fetch(process.env.REACT_APP_API + '/likes', {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-authorization-token': token,
              'postId': postId,
            }
          }).then(() => {
            let items = [...posts];
            let postIndex = posts.findIndex((post) => post.id === postId);
            let item = {...items[postIndex]};
            let likeIndex = item.likes.findIndex((like) => like.user.id == userId);
            item.likes.splice(likeIndex, 1);
            setPosts((prevPosts) => {
            prevPosts[postIndex] = {...prevPosts[postIndex], ...item}
            return [...prevPosts];
          })
        });  
    }

    const isLiked = (post) => {
      if (post.likes == null) return false;
      const likeIndex = post.likes.findIndex((like) => like.user.id == userId);
      if (likeIndex != -1) {
        return true;
      }
      return false;
    }

    const handleLike = (event) => {
      event.preventDefault();
      likePost(event.currentTarget.dataset.id);
    } 

    useEffect(() => {
        fetch(process.env.REACT_APP_API + "/posts", {
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
            <div className="container">
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
            <div>
              {posts.slice().reverse().map(p => (
              <div key={p.id}>
                <div class="container">
                <Card className="card" border='primary'>
                <Card.Body className="card-body">
                  <Card.Title className="card-title text-left">
                    {p.user.username}
                  </Card.Title>
                  <Card.Text>
                    {p.postBody}
                  </Card.Text>
                  {isLiked(p)?<Button variant="danger" data-id={p.id} onClick={() => unlikePost(p.id)}> 
                      Unlike <Badge variant="light">{p.likes==null?0:p.likes.length}</Badge>
                    </Button>:
                    <Button variant="primary" data-id={p.id} onClick={handleLike}> 
                      Like <Badge variant="light">{p.likes==null?0:p.likes.length}</Badge>
                    </Button>
                  }
                  <Card.Link href="/#">&nbsp; Add Comment</Card.Link>
                  <Card.Link href="/#">Share</Card.Link>
                </Card.Body>
                </Card> 
                </div>
              </div>
              ))}
            </div>
          </div>
          </>
        );
      }
    }