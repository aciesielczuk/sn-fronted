import React, { useState, useEffect } from 'react';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

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
          <ul>
            {posts.map(p => (
              <li key={p.id}>
                {p.id} {p.postBody}
              </li>
            ))}
          </ul>
        );
      }
    }