const express = require('express');
const router = express.Router();
const posts = require('../models/postSchema');

router.get('/', (req, resp) => {
    console.log("connect");
    resp.send('hello');
});

// REGISTER THE DATA
router.post('/register', async (req, resp) => {
    const {name, date, image, title, description} = req.body;
    if(!name || !date || !image || !title || !description){
        resp.status(404).json('please fill the data')
    }

    try{
        const addpost = new posts({name, date, image, title, description});
        await addpost.save();
        resp.status(201).json(addpost);
        console.log(addpost)
    }
    catch(err){
        resp.status(422).json(err);
    }
});


// GET THE DATA
router.get('/getdata', async (req, resp) => {
    try{
        const postdata = await posts.find({});
        resp.status(201).json(postdata)
    }
    catch(err){
        resp.status(422).json(err);
    }
})


// GET INDIVIDUAL POST
router.get('/getpost/:id', async (req, resp) => {
    try{
        console.log(req.params)
        const {id} = req.params;

        const postindividual = await posts.findById({_id:id})

        console.log(postindividual)
        resp.status(201).json(postindividual)
    }
    catch(err){
        resp.status(422).json(err);
    }
})


// UPDATE POST DATA
router.patch('/updatepost/:id', async (req, resp) => {
    try{
        const {id} = req.params;
        const updatedpost = await posts.findByIdAndUpdate(id, req.body, {new:true})
        console.log(updatedpost);
        resp.status(201).json(updatedpost)
    }
    catch(err){
        resp.status(422).json(err);
    }
})


// DELETE USER
router.delete('/delete/:id', async (req, resp) =>{
    try{
        const {id} = req.params;
        const deletedpost = await posts.findByIdAndDelete({_id:id})
        console.log(deletedpost);
        resp.status(201).json(deletedpost)
    }
    catch(err){
        resp.status(422).json(err);
    }
})

module.exports = router;