const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/',async (req,res) => { // //we can use '/api/posts' as in posts.js - '/'
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray()); //response is a return - array of posts in database
})

//Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({ //inserone is a mongodb inbuilt function to add one data
        text: req.body.text, // req.body -> body pasrser and text is a variable
        createdAt : new Date()
    });
    res.status(201).send();  //201 is a status code says everything is ok and created one new data 
})

//Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectId(req.params.id)
    });
    res.status(200).send();
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://vfxnaveen827:Ramesh5609@vue-express.07pxtwq.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('vue-express').collection('posts');
}


module.exports = router;