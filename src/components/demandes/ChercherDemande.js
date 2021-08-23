import React from "react";
import { useState } from "react";
import axios from "axios";
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
const api = axios.create(
 { baseURL: 'http://127.0.0.1:8000/api/demande'}
);
const ChercherFourniture = ({childToParent}) => {
    const [ searchedValue, setValue ] = useState("")
    const search = (searchedValue) => {
    api.get('/' + searchedValue)
      .then(response =>
      childToParent(response.data.demandes));
    
  }
  
    return (  
              
          <span className="input-group mb-4 border rounded-pill p-1" style={{width:"70%",height:"40px"}}>
            <div className="input-group-prepend border-0">
              <button id="button-addon4" type="button" onClick={() => search(searchedValue)} className="btn btn-link text-info rounded-circle"><i className="fa fa-search"></i></button>
            </div>
            <input style={{ height: "20px" }}  onChange={(e)=> setValue(e.target.value)} type="search" placeholder="Que recherchez-vous ?" aria-describedby="button-addon4" className="form-control bg-none border-0 ">
            </input> 
          </span>
     

  );
}

export default ChercherFourniture;