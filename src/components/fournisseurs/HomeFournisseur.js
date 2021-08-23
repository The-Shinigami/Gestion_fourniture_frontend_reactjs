import React, { Component } from 'react'
import AjouterFournisseur from './AjouterFournisseur'
import AfficherFournisseur from './AfficherFournisseur'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import ChercherFournisseur from './ChercherFournisseur';
import Home from '../Home'
import auth from '../authentification/auth';

axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/fournisseur'
})
class HomeFournisseur extends Component {
       constructor(props) {
    super(props);
    
       this.state = {
         fournisseurs: [],
         show:false
      }
      this.handleClose.bind(this);
      this.handleShow.bind(this);
      
  }
  componentDidMount() {
     auth.checkRole();
    if (localStorage.getItem("role") !== "admin") { this.props.history.push("/");}
    const sidenav = document.getElementById('full-screen-example');
    const content = document.getElementById('content');
    if (sidenav.style.width === "240px") {
      content.style.marginLeft = "240px";
    }else if (sidenav.style.width === "50px") {
      content.style.marginLeft = "50px";
    }
     axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
  }
// recuperer les fournisseurs
  async getFournisseurs() { 
   await api.get('/').then(res => {
      this.setState({fournisseurs : res.data.fournisseurs})  
   }
     
    )
  }
   
  callbackFunction = async () => {
    await this.getFournisseurs();
     
  }
  //modal animation
  handleClose = () => {
    
    this.setState({
      show:false
    })
  };
  handleShow = async () => {
    await this.getFournisseurs();
   this.setState({
      show:true
    })
  }
  ;
 
  //get data to searsh
    childToParent = (childdata) => {
      this.setState({
        fournisseurs:childdata
      });      
  }
    render() {
      return (
        <div>
          <Home></Home>
               <div id="content" style={{ marginLeft: "240px" }}>
               <AjouterFournisseur style={{ margin: "auto", width: "800px" }} parentCallback={this.callbackFunction} ></AjouterFournisseur>
 
             <button className="style-5" onClick={this.handleShow}>     Afficher fournisseur</button>

      <Modal onHide={()=> console.log()} show={this.state.show} onClick={() => this.handleClose} dialogClassName="modal-90w">
        <Modal.Header style={{paddingBottom:"0px"}} >
               <Modal.Title>
              <i className="fas fa-times"  style={{cursor:"pointer"}} onClick={this.handleClose}></i>
               </Modal.Title>
               <ChercherFournisseur childToParent={ this.childToParent} ></ChercherFournisseur>
        </Modal.Header>
        <Modal.Body> <AfficherFournisseur   fournisseurs={this.state.fournisseurs} parentCallback={this.callbackFunction}></AfficherFournisseur ></Modal.Body>
      </Modal>
            </div>
            
          </div>
       
        )
    }
}

export default HomeFournisseur
