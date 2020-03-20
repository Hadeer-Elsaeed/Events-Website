const express = require("express");
let adminRouter = express.Router();

adminRouter.get("/profile",(request,response)=>{
    // console.log(request.flash('userName'));
    response.render('admin/profile');
});




module.exports=adminRouter;