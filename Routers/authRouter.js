const express = require("express");
let authRouter = express.Router();
let path = require("path");


require("./../Models/speakerModel.js");
let mongoose =require("mongoose");
let loginModel =mongoose.model("speakers");
 


authRouter.get("/login",(request,response)=>{
    response.render("authorization/login");
});
count=0;
authRouter.post("/login",(request,response)=>{
    username=request.body.userName;
    userpassword = request.body.userPassword;

    if(request.body.userName=="eman"&&request.body.userPassword=="123"){
        request.session.userName = request.body.userName;
        request.session.role ="admin";
        console.log(request.session);      
        response.redirect("admin/profile");

        console.log("you are admin");
    }
    else {
        console.log(username,userpassword)
        loginModel.findOne({UserName:username})
        .then((data)=>{
            console.log(data);
            request.session.speaker_id=data._id;
            // console.log(request.session.speaker_id);
        })
        .catch((error)=>{
            console.log(error);
        });

        loginModel.find({ $and:[{UserName:username},{UserPassword:userpassword}]})
        .then((data)=>{
            console.log(data);
            if(data !=null)
            {
             request.session.role ="speaker";
                request.session.userName = request.body.userName;
                 response.redirect("speakers/profile");
               }
               else{
                response.redirect("/login");

               }

             }
                
        )
    
        .catch((error)=>{
            response.redirect("/login");
            console.log(error+"you must register");
            
        })
    }
   

});

authRouter.get("/register",(request,response)=>{
    response.render("authorization/registration");
    
});

authRouter.post("/register",(request,response)=>{
console.log(request.body);
    var speakerObj = new loginModel({
        _id:request.body._id,
        "FullName.firstName":request.body.firstName,
        "FullName.lastName":request.body.lastName,
        UserName: request.body.UserName,
        UserPassword: request.body.UserPassword,
        "Address.city":request.body.city,
        "Address.street":request.body.street,
        "Address.building":request.body.building
    
    }).save()// {_id,city,street,}
    .then((data)=>{
        response.render("authorization/login");
        console.log("success registration");

    })
    .catch((error)=>{
        response.render("authorization/registration");
        console.log("error in registration")
        console.log(error+"");
    })
});


        
authRouter.get("/logout",(request,response)=>{
    response.send("in /logout");
    console.log("logout");
});
module.exports= authRouter;