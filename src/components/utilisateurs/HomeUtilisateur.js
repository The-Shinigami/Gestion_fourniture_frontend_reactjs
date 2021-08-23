import React, { Component } from 'react'
import AjouterUtilisateur from './AjouterUtilisateur';
import AfficherUtilisateur from './AfficherUtilisateur';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import ChercherUtilisateur from './ChercherUtilisateur';
import Home from '../Home'

axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/utilisateur'
})
class HomeUtilisateur extends Component {
    constructor(props) {
    super(props);
    
       this.state = {
         utilisateurs: [],
         utilisateurToEdit: [],
         services:"",
         show:false
      }
      this.handleClose.bind(this);
      this.handleShow.bind(this);

      
  }
  componentDidMount() {
     const sidenav = document.getElementById('full-screen-example');
    const content = document.getElementById('content');
    if (sidenav.style.width === "240px") {
      content.style.marginLeft = "240px";
    }else if (sidenav.style.width === "50px") {
      content.style.marginLeft = "50px";
    }
    this.getServices();
  }
// recuperer les utilisateurs
  async getUtilisateurs() { 
   await api.get('/').then(res => {
      this.setState({utilisateurs : res.data.utilisateurs})  
   }
     
    )
  }
   async getServices()
  {
   await api.get("/create")
     .then(response => this.setState({
        services: response.data.services
     }));
  }
   
  callbackFunction = async () => {
    await this.getUtilisateurs();
     
  }
  //modal animation
  handleClose = () => {
    
    this.setState({
      show:false
    })
  };
  handleShow = async () => {
    await this.getUtilisateurs();
   this.setState({
      show:true
    })
  }
  ;
 
  //get data to searsh
    childToParent = (childdata) => {
      this.setState({
        utilisateurs:childdata
      });
  }
     render() {
     
       return (
         <div >
           <Home></Home>
           <div id="content" style={{ marginLeft: "240px" }}>
           
           <AjouterUtilisateur style={{ margin: "auto", width: "800px" }} parentCallback={this.callbackFunction} ></AjouterUtilisateur>
          
             <button className="style-5" onClick={this.handleShow}>
           Afficher utilisateurs 
             </button>

      <Modal onHide={()=> console.log()} show={this.state.show} onClick={() => this.handleClose} dialogClassName="modal-90w">
        <Modal.Header style={{paddingBottom:"0px"}} >
               <Modal.Title>
              <i className="fas fa-times"  style={{cursor:"pointer"}} onClick={this.handleClose}></i>
               </Modal.Title>
               <ChercherUtilisateur childToParent={ this.childToParent} ></ChercherUtilisateur>
        </Modal.Header>
        <Modal.Body> <AfficherUtilisateur  utilisateurs={this.state.utilisateurs} services={this.state.services} parentCallback={this.callbackFunction}></AfficherUtilisateur></Modal.Body>
     
      </Modal>
           
         
           </div>
          
         </div>

          )
    }
}

export default HomeUtilisateur


