import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import AfficherStock from './AfficherStock';
import ChercherStock from './chercherStock';
import Home from '../Home';
import auth from '../authentification/auth';
import AfficherFournitureTopDemandes from './AfficherFournitureTopDemandes';
import AfficherFournitureUtilisateurOuFournisseur from './AfficherFournitureUtilisateurOuFournisseur';
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
const api = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/statistique'
});
export class HomeStatistique extends Component {
    constructor(props) {
        super(props);
        this.state={
          fournitures: "",
            load:false,
            show: false,
            show_:false,
            show__:false
        };
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
    this.getStock();
  }
  async getStock() {  
   await  api.get('/stock')
            .then(response =>
                (this.setState({
                  fournitures: response.data.fournitures,
                  load:true
                })
            )
     )
       
    
    }
       //modal animation
  handleClose = () => {
    
    this.setState({
      show:false
    })
  };
  handleShow =  () => {
   this.setState({
      show:true
    })
  }
  /* ************** */
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
   /* ****************** */
    handleClose__ = () => {   
    this.setState({
      show__:false
    })
  };
  handleShow__ = async () => {
   this.setState({
      show__:true
    })
  }
  childToParent = (childdata) => {
    this.setState({
      fournitures: childdata
    });
  }
    render() {
      return (
        <div> 
          <Home></Home>
          <div id="content">
              {!this.state.load ?
          <div className=" spinner-border m-auto" style={{ position: "relative",top:"250px" }}  role="status">
                    <span className="sr-only">Loading...</span>
                    </div>:null}
            {this.state.load ?<div>
               <div className="container mt-5">
              <div className="row justify-content-around">
                <div className="col mt-5">
                <button type="button" className="style-6" onClick={() => this.handleShow()}>afficher stock</button>

                </div>
              </div>
              <div className="row justify-content-around">
                <div className="col mt-5">
                 <button type="button" className="style-5" onClick={() => this.handleShow_()}>afficher Top Fourniture Demandée</button>

                </div>
              </div>
              <div className="row justify-content-around">
                <div className="col mt-5">
                 <button type="button" className="style-6" onClick={() => this.handleShow__()}>afficher utilisateur ou bien fournisseur d'une fourniture</button>
                </div>
                 </div>
            </div>

            
            
            <Modal onHide={() => console.log()} show={this.state.show} onClick={() => this.handleClose} dialogClassName="modal-90w">
              <Modal.Header style={{ paddingBottom: "0px" }} >    
               <Modal.Title>
              <i className="fas fa-times"  style={{cursor:"pointer"}} onClick={this.handleClose}></i>
                </Modal.Title>
                <ChercherStock childToParent={ this.childToParent} ></ChercherStock>
        </Modal.Header>
        <Modal.Body style={{paddingRight:"10px",paddingLeft:"10px"}}> <AfficherStock  fournitures={this.state.fournitures}  ></AfficherStock ></Modal.Body>
            </Modal>
            {/*************************** */}
                <Modal  onHide={()=> console.log()} show={this.state.show_} onClick={() => this.handleClose_} dialogClassName="modal-100w">
              <Modal.Header style={{ paddingBottom: "0px" }} >    
               <Modal.Title>
              <i className="fas fa-times"  style={{cursor:"pointer"}} onClick={this.handleClose_}></i>
                </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{paddingRight:"10px",paddingLeft:"10px"}}> <AfficherFournitureTopDemandes></AfficherFournitureTopDemandes></Modal.Body>
            </Modal>

 {/*************************** */}
                <Modal  onHide={()=> console.log()} show={this.state.show__} onClick={() => this.handleClose__} dialogClassName="modal-100w">
              <Modal.Header style={{ paddingBottom: "0px" }} >    
               <Modal.Title>
              <i className="fas fa-times"  style={{cursor:"pointer"}} onClick={this.handleClose__}></i>
                </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{paddingRight:"10px",paddingLeft:"10px"}}>   <AfficherFournitureUtilisateurOuFournisseur ></AfficherFournitureUtilisateurOuFournisseur></Modal.Body>
            </Modal>
             </div> : null}
           
                    
          </div>
          
          </div>
    
        )
    }
}

export default HomeStatistique
