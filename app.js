const express = require("express");
const app = express();
let ejs = require("ejs");
let noticias = require("./FulfillmentMessages/noticias");
const connectDB = require("./DB/ConnectDb");
const Post = require("./DB/Models/Post");
const { Mongoose } = require("mongoose");
const deletePost = require("./DB/deleteDb");
const session = require("express-session");
require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views/"));

app.use(
  session({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: true,
  })
);

connectDB();
app.get("/", (req, res, next) => {
  res.render("login.ejs", { login: isLogged });
});
app.post("/login", (req, res, next) => {
  var password = req.body.password;

  if (password === process.env.password) {
    req.session.logedd = true;
    res.redirect("/posts");
  } else {
    res.redirect("/");
  }
});

app.get("/posts", isLogged(), (req, res) => {
  var dbPosts = [];
  Post.find({}, (error, posts) => {
    if (error) {
      console.log(error);
      res.status(500).send;
    } else {
      dbPosts = posts;

      res.render("index.ejs", { dbPosts: dbPosts, deletePost: deletePost });
    }
  });
});

app.post("/posts", async (req, res) => {
    const { imgUrl, title, description, theme, link } = req.body;
    let post = {};
    post.imgUrl = imgUrl;
    post.title = title;
    post.description = description;
    post.theme = theme;
    post.link = link;
    let postModel = new Post(post);
    await postModel.save();
    res.redirect("/posts");
  });

app.get("/posts/:id", isLogged(), (req, res) => {
  console.log(req.params.id);
  Post.findByIdAndDelete(req.params.id, (error, post) => {
    if (error) {
      console.log(error);
      res.status(500).send;
    } else {
      console.log(post);
    }
  });
  res.redirect("/posts");
});
app.get("/posts/:id/edit", isLogged(), (req, res) => {
  Post.findById(req.params.id, (error, dbPost) => {
    if (error) {
      console.log(error);
      res.status(500).send;
    } else {
      res.render("update.ejs", { dbPost: dbPost });
    }
  });
});
app.post("/posts/:id/edit", isLogged(), (req, res) => {
  const { imgUrl, title, description, theme, link } = req.body;
  Post.findById(req.params.id, async (error, dbPost) => {
    if (error) {
      console.log(error);
      res.status(500).send;
    } else {
      dbPost.imgUrl = imgUrl ?? dbPost.imgUrl;
      dbPost.title = title ?? dbPost.title;
      dbPost.description = description ?? dbPost.description;
      dbPost.theme = theme ?? dbPost.theme;
      dbPost.link = link ?? dbPost.link;
      await dbPost.save();
      res.redirect("/posts");
    }
  });
});



app.post("/dialogflow", (request, response) => {
  if (request.body.queryResult.intent.displayName == "noticias") {
    response.json(noticias.quickReplies);
  }
  if (request.body.queryResult.intent.displayName == "noticias - Esporte") {
    Post.find({ theme: "Esporte" }, (error, posts) => {
      if (error) {
        console.log(error);
        response.status(500).send;
      } else {
        jsonteste = noticias.createElements(posts);
        if (posts.length == 0) {
          response.json(noticias.apologies);
        } else {
          if (posts.length > 10) posts = posts.slice(0, 11);
          noticias.noticiasCarr.fulfillmentMessages[0].payload.facebook.attachment.payload.elements =
            jsonteste.elements;
          response.json(noticias.noticiasCarr);
        }
      }
    });
  }
  if (request.body.queryResult.intent.displayName == "noticias - Politica") {
    Post.find({ theme: "Política" }, (error, posts) => {
      if (error) {
        console.log(error);
        response.status(500).send;
      } else {
        jsonteste = noticias.createElements(posts);
        if (posts.length == 0) {
          response.json(noticias.apologies);
        } else {
          if (posts.length > 10) posts = posts.slice(0, 11);
          noticias.noticiasCarr.fulfillmentMessages[0].payload.facebook.attachment.payload.elements =
            jsonteste.elements;
          response.json(noticias.noticiasCarr);
        }
      }
    });
  }
  if (
    request.body.queryResult.intent.displayName == "noticias - Entretenimento"
  ) {
    Post.find({ theme: "Entretenimento" }, (error, posts) => {
      if (error) {
        console.log(error);
        response.status(500).send;
      } else {
        jsonteste = noticias.createElements(posts);
        if (posts.length == 0) {
          response.json(noticias.apologies);
        } else {
          if (posts.length > 10) posts = posts.slice(0, 11);
          noticias.noticiasCarr.fulfillmentMessages[0].payload.facebook.attachment.payload.elements =
            jsonteste.elements;
          response.json(noticias.noticiasCarr);
        }
      }
    });
  }
  if (request.body.queryResult.intent.displayName == "noticias - Famosos") {
    Post.find({ theme: "Famosos" }, (error, posts) => {
      if (error) {
        console.log(error);
        response.status(500).send;
      } else {
        jsonteste = noticias.createElements(posts);
        if (posts.length == 0) {
          response.json(noticias.apologies);
        } else {
          if (posts.length > 10) posts = posts.slice(0, 11);
          noticias.noticiasCarr.fulfillmentMessages[0].payload.facebook.attachment.payload.elements =
            jsonteste.elements;
          response.json(noticias.noticiasCarr);
        }
      }
    });
  }
});
app.get("/privacypolicy", (req, res) => {
  res.send();
});

app.listen(process.env.PORT || 8080);

function isLogged() {
  return (req, res, next) => {
    if (req.session.logedd) return next();
    res.redirect("/");
  };
}
