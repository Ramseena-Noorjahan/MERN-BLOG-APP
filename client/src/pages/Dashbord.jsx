import React, { useState } from 'react'
import {DUMMY_POSTS} from "../data"
import {Link} from "react-router-dom"
const Dashbord = () => {
    const [posts,setPosts] = useState(DUMMY_POSTS)
  return (
<section className="dasshbord">
    {
        posts.length ? <div className="container dashbord__container">
            {
                posts.map(post => {
                    return <article key={post.id} className='dashbord__post'> 
                    <div className="dashboard__post-info">
                        <div className="dashbord__post-thumbnail">
                            <img src={post.thumbnail} alt="" />
                        </div>
                        <h5>{posts.title}</h5>
                    </div>
                    <div className="dashbord__post-action">
                        <Link to={`/posts/${post.id}`} className="btn sm">View</Link>
                        <Link to={`/posts/${post.id}/edit`} className="btn sm primary">Edit</Link>
                        <Link to={`/posts/${post.id}/delete`} className="btn sm danger">Delete</Link>
                    </div>
                     </article>
                })
            }

        </div> : <h2 className='center'>You have no posts yet.</h2>
    }
</section>  )
}

export default Dashbord