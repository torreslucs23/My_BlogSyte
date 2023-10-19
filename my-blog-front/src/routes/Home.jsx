import React from 'react'

import BlogPosts from '../axios/config'

import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'



import "./Home.css"

    const Home = () => {

    const [posts, setPosts] = useState([])

    const getPosts = async() => {
        try {

            const response = await BlogPosts.get("/lastMinPosts/");
            
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
    <div class='home'>
        <div class='description flex flex-col mb-20'>
            <img src={'/images/papagaio.jpg'} class='my-pic w-[210px] h-[210px] object-cover rounded-full self-start mb-10'/>
            <h2 class="text-start text-[20px] mb-20">
            Hi, I'm Lucas Torres. I'm a Computer Science student and a Python lover. 
            This is my Web Blog Project!!!
             </h2>
            <p className="text-lg text-gray-300">
            This project was made using Django Rest Framework and ReactJS.
            </p>
            <br />

        </div>
        
        
        <h1 class='text-[35px]'>Latest Posts</h1>
        <br />
        <div class='allposts-all grid grid-cols-1 md:grid-cols-3 '>
        {posts.length === 0 ? (<p>loading...</p>) : (
            posts.map((post) => (
                <div class='post flex flex-col items-center text-center w-48 justify-self-center' key={post.id}>
                    <h2 class='my-1'>{post.title}</h2>
                    <img class='w-20 h-20 object-cover rounded-full' src={post.image} alt="" />
                    <p class='mb-4 max-w-300'>{post.excerpt}</p>
                    <Link to={`/post/${post.pk}`} class='no-underline text-whitesmoke transition-transform transition-bg hover:transform hover:scale-110 hover:bg-indigo-900 p-2'>
                        read more
                    </Link>
                </div>
            ))
        )}
        </div>

    </div>
    

  )
}   

export default Home