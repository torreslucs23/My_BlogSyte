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
    <div className='home'>
        <div className=''>
            <img src='src/routes/images/papagaio.jpg' className='my-pic w-220'/>
            <h2 className="text-2xl text-white font-semibold mb-4">
            Hi, I'm Lucas Torres. I'm a Computer Science student and a Python lover. 
            This is my Web Blog Project!!!
            </h2>
            <p className="text-lg text-gray-300">
            This project was made using Django Rest Framework and ReactJS.
            </p>
            <br />
            <br />
            <br />

        </div>
        
        
        <h1>Últimos Posts</h1>
        <div className='allposts'>
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

export default Home