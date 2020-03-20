let express = require("express");
 let path=require("path");

let server = express();
let authRouter = require("./Routers/authRouter");
let speakerRouter = require("./Routers/speakerRouter");
let eventsRouter = require("./Routers/eventsRouter");
let adminRouter = require("./Routers/adminRouter");
let mongoose = require("mongoose");
let express_session =require("express-session");
let flash = require('connect-flash-plus');
 


//connect to server nodejs
server.listen(8082,function(){
    console.log("you are connected in server");
});

//connect to mongoose db
mongoose.connect('mongodb://localhost:27017/FirstModel',{useNewUrlParser: true,
useUnifiedTopology: true  })

    .then((data)=>{
        console.log("connection sucess");
    })
    .catch((err)=>{
        console.log(err +"this is error");

    })
/* -----------------------------------------------*/
//settings
server.use(express.urlencoded({ extended: true }));
server.set('view engine','ejs');
server.set('views', path.join(__dirname, 'views'));
server.use(express.static((path.join (__dirname,"views"))));
server.use(express.static((path.join (__dirname,"public"))));

 server.use(express.static(path.join(__dirname,"node_modules","bootstrap","dist")))
 server.use(express.static(path.join(__dirname,"node_modules","jquery","dist")))

 server.use(express_session({
     secret:"hadeerelsaeed"
 }));
  

 
// server.use(session({
//   secret: 'keyboard cat',
//   cookie: { maxAge: 60000 }
// }));
 
// server.use(flash());

/* -----------------------------------------------*/ 
// server.get('/',function(request,response){
//     response.render("auth/login");
// });
server.use(function(request,response,next){
    console.log("middle");
     next();
});


server.use(authRouter);
server.use((request,response,next)=>{
 
        if(request.session.role=="admin"){

            console.log("you are login as admin");
            response.locals.userName = request.session.userName;
            next();
            
        }
        else if(request.session.role=="speaker"){
            response.locals.speakerName = request.session.userName;
            next();

        }
        else{
            response.redirect("/login");
            console.log("not login");
        }
        
        
       
    
})
server.use("/speakers",speakerRouter);
server.use("/events",eventsRouter);
server.use("/admin",adminRouter);
// app.use(bodyParser.urlencoded({extended: true}));

