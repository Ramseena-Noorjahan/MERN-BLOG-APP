import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader";

import { Postitem } from "./Postitem";

//start

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts`
        );
        setPosts(response?.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container post__container">
          {posts.map(
            ({
              _id:id,
              title,
              thumbnail,
              category,
              description,
              creator,
              createdAt,
            }) => (
              <Postitem
                key={id}
                postID={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                description={description}
                authorid={creator}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">No Posts Found</h2>
      )}
    </section>
  );
};
//stop

export default Posts;
