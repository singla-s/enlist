const express = require("express");
const https = require("https");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const data = {
        members:[
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const options = {
        method: "POST",
        auth: "sinni:ab24f12c7427202d6f1f3d45efec5718-us2"
    }
    var url = "https://us2.api.mailchimp.com/3.0/lists/ad0228efcc";
    var request = https.request(url, options, function(response) {
        response.on("data", function(data) {
            var jsonData = JSON.parse(data);
            if (jsonData.total_created>0) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        });
    });
    request.write(jsonData);
    request.end();
});



//listen to 3000 port
app.listen(3000, function() {
    console.log("Server listening on port 3000");
});

//API Key
//ab24f12c7427202d6f1f3d45efec5718-us2

// Audience id or listid
// ad0228efcc
