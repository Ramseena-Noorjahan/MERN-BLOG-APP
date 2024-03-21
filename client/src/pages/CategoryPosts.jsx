import React from 'react'
import {DUMMY_POSTS} from "../data"
import { useState } from 'react'
import { Postitem } from '../Components/Postitem'

const CategoryPosts = () => {
    const [posts,setPost] = useState(DUMMY_POSTS)
  return (
        <section className="author_posts">
      {posts.length > 0?<div className="container post__container">
        {
            posts.map(({id,title,thumbnail,category,desc,authorid})=>
             <Postitem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} description={desc} authorid={authorid}/>

            )
        }
        </div>: <h2 className="center">No Posts Found</h2>}

    </section>
  )
}

export default CategoryPosts










