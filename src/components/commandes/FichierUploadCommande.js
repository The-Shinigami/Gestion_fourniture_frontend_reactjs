import React, { Component } from 'react';
import axios from 'axios';
import Fichiers from "./Fichiers";
import Modal from 'react-bootstrap/Modal';
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/commande'
})
export default class FichierUploadCommande extends Component {
    constructor(props) {
        super(props);

        this.state = {
          fichier: "",
          showFichiers: false,
          loadFichiers: false,
          commandes_fichier_id:"",
            responseMsg: {
                status: "",
                message: "",
                error: "",
            },
        };
  }
     //modal animation
  handleClose = () => {
    
    this.setState({
      showFichiers:false
    })
  };
  handleShow = () => {
   this.setState({
      showFichiers:true
    })
  }

    // fichier onchange hander
    handleChange = (e) => {
        this.setState({
            fichier: e.target.files[0]
        })
    }

    // submit handler
    submitHandler = async(e) => {
        e.preventDefault();
        const data = new FormData() 
        data.append('fichier', this.state.fichier)

      await  api.post("/upload", data)
        .then((response) => {
            if (response.status === 200) {
            this.setState({
                responseMsg: {
                status: response.data.status,
                message: response.data.message,
              },
              loadFichiers: true,
              commandes_fichier_id:response.data.commandes_fichier_id
            });
             
              if (this.state.commandes_fichier_id !== undefined) {
                const commande_file = document.getElementById('commande_file');
                commande_file.style.backgroundColor = "#90EE90";
                commande_file.querySelector("i").classList.remove("bi-upload");
                commande_file.querySelector("i").classList.add("bi-file-earmark-check");
                commande_file.querySelector("button").disabled = true;
              }
              
               this.props.parentCallback(this.state.commandes_fichier_id);
            setTimeout(() => {
                this.setState({
                responseMsg: "",
                });
            }, 5000);        
          }
           this.setState({      
              loadFichiers:false
            });
        })
        .catch((error) => {
            console.error(error);
        });
  }
  
    render() {
    return (
      <div className="container mt-0 pt-0 pb-0">
        <div className="row">
          <div className="col">
            <form  onSubmit={this.submitHandler} encType="multipart/form-data" id="fichierForm">
              <div>
                {this.state.responseMsg.status === "successs" ? (
                  <div className="alert alert-success">
                    {this.state.responseMsg.message}
                  </div>
                ) : this.state.responseMsg.status === "failed" ? (
                  <div className="alert alert-danger">
                    {this.state.responseMsg.message}
                  </div>
                ) : (
                  ""
                )}
              {/*   <div className="card-header">
                  <h4 className="card-title fw-bold">
                    Upload Fichier in React Using Laravel 8 API
                  </h4>
                </div> */}

                
                    <div className="row">
                  <div className="col-1 p-0">
                    <span >
                    <button className="btn" type="button" onClick={ this.handleShow}><i className="bi bi-folder" style={{cursor:"pointer"}} ></i></button> 
                    </span>
                      </div>
                       <div className="col-10 p-0">
                  
                    <input
                      type="file"
                      name="fichier"                      
                      onChange={this.handleChange}
                          className="form-control "
                        >
                    </input>
                    
                    
                    <span className="text-danger">
                      {this.state.responseMsg.error}
                    </span>
                    </div>
       
                   <div className="col-1 p-0 m-0"  id="commande_file">
                    <span  > <button style={{ height: "40px",margin:"0px"}} type="submit" className="btn" >
                    <i className="bi bi-upload "   ></i>
                   </button></span>
                      </div>
                      </div>
                       
            
              </div>
            </form>
            
          </div>
        </div>
  {/*       <Button className="mt-4" variant="primary" onClick={this.handleShow}>
       Afficher Tout Les Fichiers
      </Button> */}

          <Modal  onHide={()=> console.log()} show={this.state.showFichiers} onClick={ this.handleClose} scrollable={true} style={{ overflow: 'auto' }} dialogClassName="modal-90w">
          <Modal.Header style={{ paddingBottom: "0px" }} >   
             <span className="m-auto" ><h4 >List Des Fichiers</h4></span> 
           <span> <i className="fas fa-times fa-3x" style={{ cursor: "pointer" }} onClick={ this.handleClose}></i></span> 
          </Modal.Header>
           <Modal.Body> <Fichiers loadFichiers={this.state.loadFichiers} /></Modal.Body>
         
            </Modal>
          
            
        
      </div>
    );
  }
}