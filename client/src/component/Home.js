import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

function Home() {
     const [data,setData] = useState([]);


     useEffect(() => {
       axios.get(`/api/fileInfo`)
       .then(res => {
         console.log(`data =`, res.data);
         setData(res.data.output);
       })
       .catch(err => toast.error(err.response.data.msg))
     },[]);

     const delHandler = (id) => {
       console.log(`id =`, id);
       if(window.confirm(`Are you Sure to delete id = ${id}?`)){
         axios.delete(`/api/delete/${id}`)
         .then(res => {
          toast.success("file Deleted SuccessFully");
          window.location.href = "/";
         }).catch(err => toast.error(err.message))
       } else {
         toast.warning('delete terminated')
       }
     }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-success">Files</h3>
        </div>
      </div>
      <div className="row">
        {
          data.map((item,key) => {
            const {_id, path, originalname, type} = item;
            return(
              <div className="col-md-4" key={key}>
                <div className="card">
                  <embed src={path} type={type} className="card-img-top" />
                  <div className="card-body">
                    <h5>{originalname}</h5>
                  </div>
                  <div className="card-footer">
                    <button onClick={() => delHandler(_id)} className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home