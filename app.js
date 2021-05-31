const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const { json } = require("body-parser");
const app=express();
const https=require("https");
app.use(bodyParser. urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html") ;  
  
})
app.post("/",function(req,res){
  const firstname=req.body.Fname;
  const lastname=req.body.Lname;
  const email=req.body.Email; 
  const data={
      members:[
          {
              email_address: email,
              status:"subscribed",
              merge_fields: {
                  FNAME: firstname,
                  LNAME: lastname
                 }
          }
      ]
  };
  const jsonData=JSON.stringify(data);
  const url= 'https://us6.api.mailchimp.com/3.0/lists/5eed4b5543';
  const options={
      method:"POST",
      auth: "Abhishek:3aea1a42c6bde351831ab82957327bce-us6"
  }
   const request= https.request(url,options,function(response){
       if(response.statusCode===200){
          
           res.sendFile(__dirname+"/success.html")
       }
       else{
        
           res.sendFile(__dirname+"/failure.html")
       }
      response.on("data",function(data){
          console.log(JSON.parse(data));
      })

  })
 request.write(jsonData);
 request.end();
 //console.log(firstname,lastname,email); 
});
app.post("/failure.html",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server started");
});
// api-key
//fdbb96a03025d317cbd803ca698b354e-us6
// list id
//5eed4b5543 5eed4b5543