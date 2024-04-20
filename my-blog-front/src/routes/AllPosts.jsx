import React from 'react'

import BlogPosts from '../axios/config'

import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'


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
     
     <div class='grid grid-cols-1 md:grid-cols-3'>
        {posts.length === 0 ? (<p>carregando...</p>) : (
            posts.map((post) => (
                <div class='post flex flex-col text-center w-48 justify-self-center align-center items-center' key={post.id}>
                    <h2 class= 'my-1'>{post.title}</h2>
                    <img class='w-20 h-20 object-cover rounded-full' src={post.image} alt="" />
                    <p class= 'mb-6'>{post.excerpt}</p>
                    <Link to={`/post/${post.pk}`} class='no-underline text-whitesmoke transition-transform transition-bg hover:transform hover:scale-110 hover:bg-indigo-900 p-2'>
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