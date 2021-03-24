const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) =>{res.sendFile(__dirname + "/views/index.html")})

app.post("/dialogflow", express.json(), (request,response) => {
    if(request.body.queryResult.intent.displayName == "teste"){
        response.json({"fulfillmentText": "teste"});
    }

});





app.listen(process.env.PORT || 8080);