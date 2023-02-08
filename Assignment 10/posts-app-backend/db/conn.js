const mongoose = require('mongoose');

const url = "mongodb+srv://pradeep_dev:pradeep_dev@cluster0.flks18f.mongodb.net/posts-data?retryWrites=true&w=majority";


mongoose.set('strictQuery', true);

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connection start")).catch((err) => console.log(err.message));

