const {Schema, model} = require("mongoose")

const postSchema = new Schema ({
    title : {type:String , required:true},
    category : {type : String ,enum : ["Agriculture", "Business", "Education", "Entertainments", "Art" ,
    "Investment", "Uncategorised", "Weather"] ,message: "{Value Is Not Supported"},
    
    description : {type:String , required:true},
    creator : {type:Schema.Types.ObjectId , ref:"user"},
    thumbnail : {type:String , required:true},


},{timestamps: true})

module.exports = model("Post" , postSchema)