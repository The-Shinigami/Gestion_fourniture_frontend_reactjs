import React, { Component } from 'react'
import AjouterFourniture from './AjouterFourniture'
import AfficherFourniture from './AfficherFourniture'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import ChercherFourniture from './ChercherFourniture';
import Home from '../Home'
import auth from '../authentification/auth';

axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/fourniture'
})
class HomeFourniture extends Component {
       constructor(props) {
    super(props);
    
       this.state = {
         fournitures: [],
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
// recuperer les fournitures
  async getFournitures() { 
   await api.get('/').then(res => {
      this.setState({fournitures : res.data.fournitures})  
   }
     
    )
  }
   
  callbackFunction = async () => {
    await this.getFournitures();
     
  }
  //modal animation
  handleClose = () => {
    
    this.setState({
      show:false
    })
  };
  handleShow = async () => {
    await this.getFournitures();
   this.setState({
      show:true
    })
  }
  ;
 
  //get data to searsh
    childToParent = (childdata) => {
      this.setState({
        fournitures:childdata
      });      
  }
    render() {
      return (
          <div>
          <Home></Home>
           <div id="content" style={{ marginLeft: "240px" }}>
               <AjouterFourniture style={{ margin: "auto", width: "800px" }} parentCallback={this.callbackFunction} ></AjouterFourniture>
 <button className="style-5" onClick={this.handleShow}>
       Afficher fourniture
      </button>

      <Modal onHide={()=> console.log()} show={this.state.show} onClick={() => this.handleClose} dialogClassName="modal-90w">
        <Modal.Header style={{paddingBottom:"0px"}} >
               <Modal.Title>
              <i className="fas fa-times"  style={{cursor:"pointer"}} onClick={this.handleClose}></i>
               </Modal.Title>
               <ChercherFourniture childToParent={ this.childToParent} ></ChercherFourniture>
        </Modal.Header>
        <Modal.Body> <AfficherFourniture   fournitures={this.state.fournitures} parentCallback={this.callbackFunction}></AfficherFourniture ></Modal.Body>
      </Modal>
            </div>
            
          </div>
           
        )
    }
}

export default HomeFourniture
