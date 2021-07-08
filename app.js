const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.listen(process.env.PORT||port,()=>{
    console.log("server running on port 3000.");
})
app.post("/",(req,res)=>{
   

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields: {
                FNAME:firstName,
                LNAME:lastName
                          }
        }
    ]
};

const jsonData = JSON.stringify(data);

const url = "https://us6.api.mailchimp.com/3.0/lists/364aae93f6";
const object = {
    method:"POST",
    auth:"prady1:10ba354d1015fd80a25f638947ae7b63-us6"
};
const request = https.request(url,object,function(response){
    if(response.statusCode == 200){
        res.sendFile(__dirname+"/success.html")
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
response.on("data",function(data){
    console.log(JSON.parse(data));
 
   
});

});
request.write(jsonData);
request.end();

});



app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
});

app.post("/failure",function(req,res){
    res.redirect("/");
});


//41cc6c08bacbc3ef0f880618ed582a92-us6 >> API key

//364aae93f6 >> list ID
