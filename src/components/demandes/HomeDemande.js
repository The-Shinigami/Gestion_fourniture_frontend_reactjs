import React, { Component } from 'react'
import AjouterDemande from './AjouterDemande'
import AfficherDemande from './AfficherDemande'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import ChercherDemande from './ChercherDemande';
import Home from '../Home'
import auth from '../authentification/auth';

axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/demande'
})
export class HomeDemande extends Component {
    constructor(props) {
    super(props);
    
       this.state = {
         demandes: [],
         show: false,
         utilisateurs: [],
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
    // recuperer les demandes
  async getDemandes() { 
   await api.get('/').then(res => {
      this.setState({demandes : res.data.demandes})  
   }
     
    )
  }
   
  callbackFunction = async () => {
    await this.getDemandes();
     
    }
    
     //modal animation
  handleClose = () => {
    
    this.setState({
      show:false
    })
  };
  handleShow = async () => {
    await this.getDemandes();
   this.setState({
      show:true
    })
  }
        
    
    //get data to searsh
    childToParent = (childdata) => {
      this.setState({
        demandes:childdata
      });      
  }
  //get options for fournitures and utilisateurs
  async getOptions() {
   await api.get('/create')
     .then(reseponse =>
     (
       this.setState({
         utilisateurs: reseponse.data.utilisateurs,
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
                
  <AjouterDemande style={{ margin: "auto", width: "800px" }} utilisateurs={this.state.utilisateurs} fournitures={this.state.fournitures} parentCallback={this.callbackFunction} ></AjouterDemande>
        
                  <button className="style-5" onClick={this.handleShow}>
      Afficher demandes
      </button>

      <Modal  onHide={()=> console.log()} show={this.state.show} onClick={() => this.handleClose} dialogClassName="modal-90w">
        <Modal.Header style={{paddingBottom:"0px"}} >
               <Modal.Title>
              <i className="fas fa-times"  style={{cursor:"pointer"}} onClick={this.handleClose}></i>
               </Modal.Title>
               <ChercherDemande childToParent={ this.childToParent} ></ChercherDemande>
        </Modal.Header>
        <Modal.Body style={{paddingRight:"10px",paddingLeft:"10px"}}> <AfficherDemande utilisateurs={this.state.utilisateurs} fournitures={this.state.fournitures}   demandes={this.state.demandes} parentCallback={this.callbackFunction}></AfficherDemande ></Modal.Body>
      </Modal> 
              </div>
            :null}
              
            </div>
       
          </div>
          )
    }
}

export default HomeDemande

