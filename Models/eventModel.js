let mongoose =require("mongoose");
let Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost:27017/FirstModel',{useNewUrlParser: true,
useUnifiedTopology: true  });
autoIncrement.initialize(connection);



let eventSchema = new Schema({
  _id: Number,
  title:  {type: String, required: true},
  eventdate: Date,
  mainSpeaker: {type: Number, ref: 'speakers'},
  otherSpeaker:[{type: Number, ref: 'speakers'}]
 
});


eventSchema.plugin(autoIncrement.plugin, {
  model: 'events',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});
let eventModel = mongoose.model('events',eventSchema );