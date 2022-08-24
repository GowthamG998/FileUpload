const File = require('../model/fileModel')
const fs = require('fs')

const fileCtrl = {
    home: async (req,res) => {
        try {
           // res.json({ msg: "home called" })
           let files = await File.find();
           res.json({
               output: files,
               length: files.length
           });
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    upload: async (req,res) => {
        try {
          // res.json({ msg: "upload called" })
          const newFile = File(req.file);

           const extFile = await File.findOne({originalname: newFile.originalname});
               if(extFile) {
                   fs.unlinkSync(newFile.path);
                   res.status(400).json({ msg: "File already exists"});
               } else {
                   await newFile.save();
                   return res.status(200).json({ msg: "file saved successfully" })
               }
         // res.json({data: newFile });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    delete: async (req,res) => {
        try {
           // res.json({msg: "delete called" });
            const id = req.params.id;
          //  res.json({id});

          const extFile = await File.findById({_id: id});
          if(!extFile)
            res.status(400).json({msg: "File not exists in database"});

            fs.unlinkSync(extFile.path);
            await File.findByIdAndDelete({_id: id});
            res.status(200).json({msg: "File deleted successfully"});
            
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = fileCtrl;