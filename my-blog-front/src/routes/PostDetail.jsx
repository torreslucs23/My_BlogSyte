import React from 'react'


import BlogPosts from '../axios/config'

import { useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'

import "./PostDetail.css"

const PostDetail = () => {

    const {id} = useParams();

    const [post, setPost] = useState([])

    const getPost = async() => {
        try {

            const response = await BlogPosts.get(`/post/${id}`);
            
            const data = response.data;
            setPost(data);
            
        } catch (error) {
            console.log(error);
        }
    }
    
    

  useEffect(() => {

      getPost();

    }, [])

  return (
    <div>
        <div>
            <section id = "summary">
            <h2 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white '>
                {post.title}
            </h2>
            <img class='h-auto max-w-full rounded-full h-auto max-w-sm shadow-lg dark:shadow-black/30 hover:scale-110 transition duration-500 cursor-pointer object-cover' 
            src={post.image} alt="" />
            
            <p className='date'>{post.date}</p>
            <p className='content'>{post.content}</p>
            {console.log(post)}
            <div className='author'>
                <p> Created by: {post.author? [post.author.first_name,
                    " ",post.author.last_name, "  -  ",post.author.email ] : ""}</p>
            </div>

            
            </section>
        </div>

    </div>
  )
}

export default PostDetail