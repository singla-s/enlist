const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("signup", function(req, res) {

});



//listen to 3000 port
app.listen(3000, function() {
    console.log("Server listening on port 3000");
});
