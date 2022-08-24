import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

//const URL = "http://localhost:5000";

function Upload(props) {
    const [data, setData] = useState("");

    const handleUpload = (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            console.log(`files =`, file);

            if(data.size > 10 * 1024 * 1025)
            return toast.error("File Size must be less than 10MB");

            setData(file)
        } catch (err) {
            toast.error(err.message)
        }
    }

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
          //console.log(`file =`, myFile);
               
         

          let formData = new FormData();
          formData.append('myFile', data);
          
          await axios.post(`/api/upload`, formData,{
              headers: {
                  'content-type': 'multipart/form-data'
              }
          })
           .then(res => {
               toast.success("File Uploaded Successfully");
               window.location.href = "/";
           }).catch(err => {
               toast.error(err.response.data.msg);
           });
               
           
        } catch (err) {
            toast.error(err.message)
        }
    }
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">File Upload</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <label htmlFor="upload">Select file to Upload</label>
                                <input type="file" name="myFile" id="myFile" onChange={handleUpload} className="form-control" required/>
                   
                            </div>
                           
                            <div className="form-group mb-2 mt-2">
                                <input type="submit" value="Upload" className="btn btn-success" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Upload