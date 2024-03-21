import React, { useState} from "react";

import thumbnail1 from "../Images/thumbnail.jpg";
import { Postitem } from "./Postitem";
import {DUMMY_POSTS} from "../data"
//start

const Posts = () => {
    const [posts,setPosts] = useState(DUMMY_POSTS)
  return (
    <section className="posts">
      {posts.length > 0?<div className="container post__container">
        {
            posts.map(({id,title,thumbnail,category,desc,authorid})=>
             <Postitem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} description={desc} authorid={authorid}/>

            )
        }
        </div>: <h2 className="center">No Posts Found</h2>}

    </section>
  )

};
//stop

export default Posts;
