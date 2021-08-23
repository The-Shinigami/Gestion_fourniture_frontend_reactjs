import React, { Component } from 'react'
import AjouterCatégorie from './AjouterCatégorie'
import AfficherCatégorie from './AfficherCatégorie'
import AfficherSousCatégorie from './AfficherSousCatégorie'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import ChercherCatégorie from './ChercherCatégorie';
import ChercherSousCatégorie from './ChercherSousCatégorie'
import Home from '../Home'
import auth from '../authentification/auth';

axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/categorie'
})
class HomeCatégorie extends Component {
       constructor(props) {
    super(props);
    
       this.state = {
           catégories: [],
            sousCatégories: [],
         show: false,
         show_: false,
         load:false
      }
      this.handleClose.bind(this);
      this.handleShow.bind(this);
      
  }
async  componentDidMount() {
     auth.checkRole();
    if (localStorage.getItem("role") !== "admin") { this.props.history.push("/");}
    const sidenav = document.getElementById('full-screen-example');
    const content = document.getElementById('content');
    if (sidenav.style.width === "240px") {
      content.style.marginLeft = "240px";
    }else if (sidenav.style.width === "50px") {
      content.style.marginLeft = "50px";
  }
  
   
  await this.getCatégoriesAndSousCatégories();
  }
// recuperer les fournisseurs
  async getCatégoriesAndSousCatégories() {
   await api.get('/').then(res => {
       this.setState({
           catégories: res.data.catégories,
           sousCatégories: res.data.sousCatégories,
           load:true
       })
   } 
    )
  }
   
  callbackFunction = async () => {
    await this.getCatégoriesAndSousCatégories();
     
  }
  //modal animation
  handleClose = () => {
    
    this.setState({
      show:false
    })
  };
  handleShow = async () => {
   this.setState({
      show:true
    })
  }
    ;
   //modal animation
  handleClose_ = () => {
    
    this.setState({
      show_:false
    })
  };
  handleShow_ = async () => {
   this.setState({
      show_:true
    })
  }
  ;
 
  //get data to searsh
    childToParent = (childdata) => {
      
      this.setState({
        sousCatégories:childdata
      });      
        
  }
      childToParent_ = (childdata) => {
      
      this.setState({
        catégories:childdata
      });      
        
  }
    render() {
      return (
        <div>
          <Home></Home>
               <div id="content" style={{ marginLeft: "240px" }}>
               <AjouterCatégorie style={{ margin: "auto", width: "800px" }} parentCallback={this.callbackFunction} ></AjouterCatégorie>
            <div className="container mt-0 pt-0">
                 <div className="row">
                 <div className="col">
                          <button className="style-5" onClick={this.handleShow}>Afficher Catégories</button>

                </div>
                   <div className="col">
                          <button className="style-5" onClick={this.handleShow_}>Afficher Sous Catégories</button>

        </div>
        </div>
        </div>

      <Modal onHide={()=> console.log()} show={this.state.show} onClick={() => this.handleClose} dialogClassName="modal-90w">
        <Modal.Header style={{paddingBottom:"0px"}} >
               <Modal.Title>
              <i className="fas fa-times"  style={{cursor:"pointer"}} onClick={this.handleClose}></i>
               </Modal.Title>
               <ChercherCatégorie childToParent_={ this.childToParent_} ></ChercherCatégorie>
        </Modal.Header>
        <Modal.Body> <AfficherCatégorie   catégories={this.state.catégories} parentCallback={this.callbackFunction}></AfficherCatégorie ></Modal.Body>
            </Modal>
            {/* ********************* */}
             <Modal onHide={()=> console.log()} show={this.state.show_} onClick={() => this.handleClose_} dialogClassName="modal-90w">
        <Modal.Header style={{paddingBottom:"0px"}} >
               <Modal.Title>
              <i className="fas fa-times"  style={{cursor:"pointer"}} onClick={this.handleClose_}></i>
               </Modal.Title>
               <ChercherSousCatégorie childToParent={ this.childToParent} ></ChercherSousCatégorie>
        </Modal.Header>
        <Modal.Body> <AfficherSousCatégorie   sousCatégories={this.state.sousCatégories} parentCallback={this.callbackFunction}></AfficherSousCatégorie ></Modal.Body>
      </Modal>
            </div>
            
          </div>
       
        )
    }
}

export default HomeCatégorie
