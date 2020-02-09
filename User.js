let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    userid:{type:String, required:true},
    points:{type:Number, required:true}
})

let User = mongoose.model("Users", userSchema);

module.exports = User;
