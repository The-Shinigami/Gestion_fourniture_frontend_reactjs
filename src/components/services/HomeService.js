import React, { Component } from 'react'
import AjouterService from './AjouterService'
import AfficherService from './AfficherService'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import ChercherService from './ChercherService';
import Home from '../Home'
import auth from '../authentification/auth';

axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/service'
})
class HomeService extends Component {
       constructor(props) {
    super(props);
    
       this.state = {
         services: [],
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
// recuperer les services
  async getServices() { 
   await api.get('/').then(res => {
      this.setState({services : res.data.services})  
   }
     
    )
  }
   
  callbackFunction = async () => {
    await this.getServices();
     
  }
  //modal animation
  handleClose = () => {
    
    this.setState({
      show:false
    })
  };
  handleShow = async () => {
    await this.getServices();
   this.setState({
      show:true
    })
  }
  ;
 
  //get data to searsh
    childToParent = (childdata) => {
      this.setState({
        services:childdata
      });      
  }
    render() {
      return (
        <div>
          <Home></Home>
               <div id="content" style={{ marginLeft: "240px" }}>
               <AjouterService style={{ margin: "auto", width: "800px" }} parentCallback={this.callbackFunction} ></AjouterService>
 
             <button className="style-5" onClick={this.handleShow}>     Afficher service</button>

      <Modal onHide={()=> console.log()} show={this.state.show} onClick={() => this.handleClose} dialogClassName="modal-90w">
        <Modal.Header style={{paddingBottom:"0px"}} >
               <Modal.Title>
              <i className="fas fa-times"  style={{cursor:"pointer"}} onClick={this.handleClose}></i>
               </Modal.Title>
               <ChercherService childToParent={ this.childToParent} ></ChercherService>
        </Modal.Header>
        <Modal.Body> <AfficherService   services={this.state.services} parentCallback={this.callbackFunction}></AfficherService ></Modal.Body>
      </Modal>
            </div>
            
          </div>
       
        )
    }
}

export default HomeService
