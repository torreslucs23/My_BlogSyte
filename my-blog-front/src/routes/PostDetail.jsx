import React from 'react'


import BlogPosts from '../axios/config'

import { useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'

import "./PostDetail.css"

import axios from 'axios'


const PostDetail = () => {


    const {id} = useParams();

    useEffect(() => {

        getComments();
        getPost();
        
  
      }, [])


    const [post, setPost] = useState({

    })

    const [comments, setComments] = useState([]

    )

    const [comment, setComment] = useState({
    name: '',
    user_email: '',
    text: '', 
    post_pk: id
})

    


    const getComments = async() =>{
        const response = await BlogPosts.get(`/comments/`);

        const data = response.data;

        const data_filtered = data.filter(objeto => objeto.post_pk == id);

        setComments(data_filtered);

    }
    

    const getPost = async() => {
        try {

            const response = await BlogPosts.get(`/post/${id}`);
            
            const data = response.data;

            setPost(data);
            
        } catch (error) {
            console.log(error);
        }
    }
    
    


    const handleInput = (event) =>{
        setComment({...comment, [event.target.name]: event.target.value})
        
    }

    function handleSubmit(event) {
        const commentData = {
            "name": comment.name,
            "user_email": comment.user_email,
            "text": comment.text,
            "post_pk": id
        }

        console.log(commentData);

        axios.post("http://localhost:8000/api/comments/", JSON.stringify(comment), {
        headers: { "Content-Type": "application/json" }
    })
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

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

            <br />
            <br />

            <div className='border-solid'>
                <h2 className='mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-white '>
                    Comments</h2>
                {comments.length === 0 ? (<p className=' font-bold'>Empty comments</p>) : (
                    comments.map((cm) => (
                        <div className="bg-grey rounded-lg shadow-md p-4 mb-4 text-gray-200 border-2 border-y-slate-800" >
                            <div>
                                <p className="font-semibold text-white text-2xl">{">>> "+cm.name}</p>
                                <p className="text-sm italic">{cm.user_email}</p>
                                <br />
                            </div>
                            <p>{cm.text}</p>
                            </div>    
                    ))
                )}
            </div>
            <br />
            <br />

            <div className='grid gap-3 mb-6 md:grid-cols-2 '>
                <h2 className='text-2xl'>Leave a comment</h2>
                <br />
                <form onSubmit={handleSubmit} id="form-comment"> 
                    Name: <input className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                             type='text' onChange={handleInput} name='name'></input> <br />
                    Email: <input className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                             type='text' onChange={handleInput} name='user_email'></input> <br />
                    <textarea className='block w-full overflow-auto p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                             type='text' onChange={handleInput} name='text'></textarea>
                    <button type='submit' form='form-comment' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded my-3">
                        Submit
                        </button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default PostDetail