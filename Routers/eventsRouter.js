const express=require("express");
let eventRouter=express.Router();
let mongoose =require("mongoose");
require("./../Models/eventModel");
require("./../Models/speakerModel");

let eventModel =mongoose.model("events");
let speakerModel =mongoose.model("speakers");

//list "get"
eventRouter.get("/list",(request,response)=>{
    eventModel.find({}).populate({
    path: 'mainSpeaker otherSpeaker' })
    .then((data)=>{
        // response.send(data);
        response.render("events/eventslist",{listevents:data});
    })
    .catch((error)=>{
        console.log(error+"");
    })
});

//add "get"
eventRouter.get("/add",(request,response)=>{
    speakerModel.find({},(error,result)=>{
        response.render("events/addevent",{speakers:result});
    })
   
});
//add "post"
eventRouter.post("/add",(request,response)=>{
   
    var eventObj = new eventModel({
    //    _id:request.body._id,
       title:request.body.title,
       eventdate:request.body.date,
       mainSpeaker:request.body.mainspeaker,
       otherSpeaker:request.body.otherspeakers
     });
     eventObj.save()    
    .then((data)=>{
        response.redirect("list")

    })
    .catch((error)=>{
        console.log(error+"");
    })
       

});

//edit "get"
eventRouter.get("/edit/:id",(request,response)=>{
    eventModel.findOne({_id:request.params.id}).populate({
        path: 'mainSpeaker otherSpeaker' })
        .then((data)=>{
            speakerModel.find().then((speakers)=>{
                response.render("events/editevent",{event:data,speakers});
            }).catch((error)=>{
                console.log(error);
            })
            // console.log(data);
        })
        .catch((error)=>{
            console.log(error+"");
        })
    
    
    });
 
    // response.send("event edit");
//edit "post"
eventRouter.post("/edit",(request,response)=>{
    console.log(request.body);
     eventModel.updateOne({ _id:request.body.ID }, { $set:request.body})
    .then((data)=>{
         response.redirect("/events/list");
     })
     .catch((error)=>{
         console.log(error+"");
    })
});

//delete 
eventRouter.get("/delete/:id",(request,response)=>{
    eventModel.deleteOne({_id:request.params.id})
    .then((data)=>{
        response.send("Done");
    })
    .catch((error)=>{
        console.log(error+"");
    })
});

eventRouter.get("/speakerEvent",(request,response)=>{
    speaker_id = request.session.speaker_id;
    eventModel.find({ $or:[{mainSpeaker:speaker_id},{otherSpeaker:{$in:[speaker_id]}}]}).populate({
    path: 'mainSpeaker otherSpeaker' })
    .then((data)=>{
        // response.send(data);
        response.render("events/speakerEvents",{listevents:data});
    })
    .catch((error)=>{
        console.log(error+"");
    })
});
module.exports=eventRouter;