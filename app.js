const express = require("express");
const app = express();
let ejs = require('ejs');
const connectDB = require("./DB/ConnectDb");
const Post = require("./DB/Models/Post");
const { Mongoose } = require("mongoose");
const deletePost = require("./DB/deleteDb")
const session = require("express-session")

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views/'));

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

connectDB();
app.get('/', (req, res, next) => {
    res.render('login.ejs',{login: isLogged});
})


app.post('/login', (req, res, next) => {
    var password = req.body.password;
    console.log(password)
    if(password === "123"){
        req.session.logedd = true;
        res.redirect('/posts');
    }

    else{
        res.redirect('/');
    } 
})

app.get("/posts",isLogged (), (req, res) =>{
    var dbPosts = [];
    Post.find({},(error, posts)=>{
        if(error){
            console.log(error);
            res.status(500).send;
        }
        else{
           dbPosts = posts;
          
           res.render('index.ejs',{dbPosts: dbPosts,deletePost:deletePost});
        }
    })
   
    
})
app.get("/posts/:id",isLogged (), (req, res) =>{
    console.log(req.params.id);
    Post.findByIdAndDelete(req.params.id, (error, post)=>{
        if(error){
            console.log(error);
            res.status(500).send;
        }
        else{
         console.log(post);
        }
    })
    res.redirect('/posts');

});
app.post('/posts', async (req, res) => {
    const { imgUrl,title,description,theme,link } = req.body;
    let post = {};
    post.imgUrl = imgUrl;
    post.title = title;
    post.description = description;
    post.theme = theme;
    post.link = link;
    let postModel = new Post(post);
    await postModel.save();
    res.redirect("/posts")
  });





app.post("/dialogflow", (request,response) => {
    if(request.body.queryResult.intent.displayName == "teste"){
        response.json({"fulfillmentText": "teste"});
    }
});



app.listen(process.env.PORT || 8080);

function isLogged () {  
	return (req, res, next) => {
	    if (req.session.logedd) return next();
	    res.redirect('/')
	}
}