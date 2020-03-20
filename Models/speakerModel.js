let mongoose =require("mongoose");
let Schema = mongoose.Schema;

let speakerSchema = new Schema({
  _id: Number,
  FullName:  {
    firstName: String,
    lastName: String 
  },
  UserName: String,
  UserPassword:Number,
  Address:{
    city: String,
    street: String,
    building: Number
  }
});
let speakerModel = mongoose.model('speakers',speakerSchema );
