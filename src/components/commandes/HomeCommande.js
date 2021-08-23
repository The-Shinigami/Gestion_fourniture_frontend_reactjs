import React, { Component } from 'react'
import AjouterCommande from './AjouterCommande'
import AfficherCommande from './AfficherCommande'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import ChercherCommande from './ChercherCommande';
import Home from '../Home'
import auth from '../authentification/auth';


const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/commande'
})
export class HomeCommande extends Component {
    constructor(props) {
    super(props);
    
       this.state = {
         commandes: [],
         show: false,
         fournisseurs: [],
         fournitures: [],
         load:false
      }
      this.getOptions.bind(this);
      this.handleClose.bind(this);
      this.handleShow.bind(this);
      
      
      
  }
  
  async componentDidMount() {
     auth.checkRole();
    if (localStorage.getItem("role") !== "admin") { this.props.history.push("/");}
    await this.getOptions();
     const sidenav = document.getElementById('full-screen-example');
    const content = document.getElementById('content');
    if (sidenav.style.width === "240px") {
      content.style.marginLeft = "240px";
    }else if (sidenav.style.width === "50px") {
      content.style.marginLeft = "50px";
    }
     axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
  }
    // recuperer les commandes
  async getCommandes() { 
   await api.get('/').then(res => {
      this.setState({commandes : res.data.commandes})  
   }
     
    )
  }
   
  callbackFunction = async () => {
    await this.getCommandes();
     
    }
    
     //modal animation
  handleClose = () => {
    
    this.setState({
      show:false
    })
  };
  handleShow = async () => {
    await this.getCommandes();
   this.setState({
      show:true
    })
  }
        
    
    //get data to searsh
    childToParent = (childdata) => {
      this.setState({
        commandes:childdata
      });      
  }
  //get options for fournitures and fournisseurs
  async getOptions() {
   await api.get('/create')
     .then(reseponse =>
     (
       this.setState({
         fournisseurs: reseponse.data.fournisseurs,
         fournitures: reseponse.data.fournitures,
         load:true
       })
     ))
  }
 
    render() {
      return (
          <div>
          <Home></Home>
          <div id="content" style={{ marginLeft: "240px" }} >
            
              {!this.state.load ?
          <div className=" spinner-border m-auto" style={{ position: "relative",top:"250px" }}  role="status">
                    <span className="sr-only">Loading...</span>
                    </div>:null}
            {this.state.load ?
              <div>
                
  <AjouterCommande style={{ margin: "auto", width: "800px" }} fournisseurs={this.state.fournisseurs} fournitures={this.state.fournitures} parentCallback={this.callbackFunction} ></AjouterCommande>
               <button className="style-5" onClick={this.handleShow}>
       Afficher commandes
      </button>

      <Modal  onHide={()=> console.log()} show={this.state.show} onClick={() => this.handleClose} dialogClassName="modal-90w">
        <Modal.Header style={{paddingBottom:"0px"}} >
               <Modal.Title>
              <i className="fas fa-times"  style={{cursor:"pointer"}} onClick={this.handleClose}></i>
               </Modal.Title>
               <ChercherCommande childToParent={ this.childToParent} ></ChercherCommande>
        </Modal.Header>
        <Modal.Body style={{paddingRight:"10px",paddingLeft:"10px"}}> <AfficherCommande fournisseurs={this.state.fournisseurs} fournitures={this.state.fournitures}   commandes={this.state.commandes} parentCallback={this.callbackFunction}></AfficherCommande ></Modal.Body>
      </Modal> 
              </div>
            :null}
              
            </div>
        
          </div>
         )
    }
}

export default HomeCommande
