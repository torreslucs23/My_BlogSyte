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
        <div className='description'>
            <img src='src/routes/images/papagaio.jpg' className='my-pic'/>
            <h2>This is my Web blog!!! This project was made using django RestFramework and ReactJS</h2>
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