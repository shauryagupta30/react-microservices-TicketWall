import React, { useState, useEffect} from "react";
// useEffect to make sure that we try to fetch 
//the list only one time when our component is created
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommnetList";

const PostList = () => {

    //piece of state
    //const [posts,setPosts] = useState([]); 
    //this means an array is returned but i  wnat to get a piece of object
    const [posts, setPosts] =  useState({});

    const fetchPosts = async () =>{
        //const res = await axios.get("http://localhost:4000/posts");
        const res = await axios.get("http://localhost:4002/posts"); console.log(res.data);
        setPosts(res.data);
    };
    
    useEffect(() =>{
        fetchPosts();
    },[]);

    //empty array tells the react to run the function only one time.
   
    const renderedPosts = Object.values(posts).map((post) => {
        return (  
        <div className="card" style = {{width: "30%", marginBottom: "20px"}} key = {post.id}>

        <div className="card-body">
            <h3>{post.title}</h3>
             {/* <CommentList postId={post.id}></CommentList>
            <CommentCreate postId={post.id}></CommentCreate> */}
            
            <CommentList comments={post.comments} />
            <CommentCreate postId = {post.id} />
            
            
        </div>
        </div>
        );    
    });
    //this is JS biult in that return all 
    //the object values in the array
    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
           {renderedPosts}
        </div>
    );
};
export default PostList;