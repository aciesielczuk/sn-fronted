import React, { useState, useEffect, useRef } from 'react';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/posts")
          .then(res => res.json())
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