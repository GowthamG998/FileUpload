const multer = require('multer');
const express = require('express');
const path = require('path');

/* Storage */
const myStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "uploads/")
    },
    filename: (req,file,cb) => {
       // cb(null, file.originalname)
       cb(null, `file-${new Date().getTime().toString()}${path.extname(file.originalname)}`)
    }
});


const upload = multer({
    storage: myStorage,
    limits: { fileSize: 10 * 1024 * 1024 }
}).single("myFile");

module.exports = upload;