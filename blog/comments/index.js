const express = require('express');
const cors = require('cors');
const bodyParser = require('body-Parser');
const {randomBytes} = require('crypto');
const app = express();
app.use(bodyParser.json());
app.use(cors()); //use this as a middleware
//storage
const commentsByPostId = {};

//route handler
app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments',(req,res)=>{
//creation of a comment
    const commentId = randomBytes(4).toString('hex');
    //incoming post id
    const {content}  = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id:commentId,content});
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
});

app.listen(4001,(req,res)=>{
    console.log('Listening on 4001');
});