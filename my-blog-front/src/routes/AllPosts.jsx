import React from 'react'

import BlogPosts from '../axios/config'

import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import "./AllPosts.css"

const AllPosts = () => {


  const [posts, setPosts] = useState([])

  const getPosts = async() => {
      try {

          const response = await BlogPosts.get("/minPosts/");
          
          const data = response.data;
          setPosts(data);
          
      } catch (error) {
          console.log(error);
      }
  } 

  useEffect(() => {

      getPosts();

    }, [])



  return (
    <div>
    
    <h2 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
        All Posts</h2>
     
     <div className='allposts-all'>
        {posts.length === 0 ? (<p>carregando...</p>) : (
            posts.map((post) => (
                <div className='post' key={post.id}>
                    <h2>{post.title}</h2>
                    <img src={post.image} alt="" />
                    <p>{post.excerpt}</p>
                    <Link to={`/post/${post.pk}`} className='btn'>
                        ler mais
                    </Link>
                </div>
            ))
        )}
        </div>
    </div>
    
  )
}

export default AllPosts;