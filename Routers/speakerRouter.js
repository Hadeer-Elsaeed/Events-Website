const express = require("express");
let speakerRouter=express.Router();
// let mongoose =require("mongoose")
require("./../Models/speakerModel.js");
let mongoose =require("mongoose");
let speakersModel =mongoose.model("speakers");
 

// profile get
speakerRouter.get("/profile",(request,response)=>{
    response.render("speakers/profile")
    
});


//add "get"
speakerRouter.get("/add",(request,response)=>{
    response.render("speakers/addSpeaker")
  
});
//add "post"
speakerRouter.post("/add",(request, response)=>{
    var speakerObj = new speakersModel({
        _id:request.body._id,
        "FullName.firstName":request.body.firstName,
        "FullName.lastName":request.body.lastName,
        UserName: request.body.UserName,
        UserPassword: request.body.UserPassword,
        "Address.city":request.body.city,
        "Address.street":request.body.street,
        "Address.building":request.body.building
    
    }).save()
    .then((data)=>{
        response.redirect("/speakers/list");
       

    })
    .catch((error)=>{
        response.render("speakers/addSpeaker");
        console.log(error+"");
    })
});



//edit "get"
speakerRouter.get("/edit/:id",(request,response)=>{
    speakersModel.findOne({_id:request.params.id},(error,result)=>{
        response.render("speakers/editSpeaker",{speaker:result});
    })
 
    
});
//edit "post"
speakerRouter.post("/edit",(request,response)=>{
   speakersModel.updateOne({ _id:request.body.ID }, { $set: {"Address.city":request.body.city,
   "Address.street":request.body.street,
   "Address.building":request.body.building }})
   .then((data)=>{
        response.redirect("/speakers/list")
    })
    .catch((error)=>{
        console.log(error+"");
    })

});

//list "get"
speakerRouter.get("/list",(request,response)=>{
    // response.send("list speakers")
    speakersModel.find({})
    .then((data)=>{
        response.render("speakers/speakerlist",{listspeakers:data});
    })
    .catch((error)=>{
        console.log(error+"");
    })
});

//delete "get"
speakerRouter.post("/delete/:_id",(request,response)=>{
    speakersModel.deleteOne({_id:request.params._id})
    .then((data)=>{
        response.send("Done");
        // response.redirect("/speakers/speakerlist");
    })
    .catch((error)=>{
        console.log(error+"");
    })
    
});

//list for speaker
speakerRouter.get("/speakerProfile",(request,response)=>{
    speakersModel.find({_id:request.session.speaker_id})
    .then((data)=>{
        // console.log(data)
        response.render("speakers/settings",{speakerData:data});
    })
    .catch((error)=>{
        console.log(error+"");
    })


});


//edit profile speaker
speakerRouter.get("/editProfile/:id",(request,response)=>{
    speakersModel.findOne({_id:request.params.id},(error,result)=>{
        console.log(result);
        response.render("speakers/editProfile",{data:result});
    })
 
    
});

speakerRouter.post("/editProfile",(request,response)=>{
   speakersModel.updateOne({ _id:request.body.id }, { $set: {
    UserName:request.body.userName,
    "FullName.firstName":request.body.firstName,
    "FullName.lastName":request.body.lastName,
    UserPassword:request.body.userPassword,
    "Address.city":request.body.city,
   "Address.street":request.body.street,
   "Address.building":request.body.building }})
   .then((data)=>{
        response.redirect("/speakers/speakerProfile")
    })
    .catch((error)=>{
        console.log(error+"");
    })

});





module.exports=speakerRouter;