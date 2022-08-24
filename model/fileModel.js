const mongoose = require('mongoose');
const File = new mongoose.Schema({
    fieldname: {
        type: String,
        required:true,
        trim:true
    },
    originalname:{
        type:String,
        required:true,
        trim:true
    },
    encoding:{
        type:String,
        required:true,
        trim:true
    },
    mimetype:{
        type:String,
        required:true,
        trim:true
    },
    destination:{
        type:String,
        required:true,
        trim:true
    },
    filename:{
        type:String,
        required:true,
        trim:true
    },
    path:{
        type:String,
        required:true,
        trim:true
    },
    size:{
        type:String,
        required:true
        
    },
},{
    collection: "files",
    timestamps: true
});

module.exports = mongoose.model("File", File);