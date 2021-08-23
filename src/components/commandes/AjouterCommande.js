import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import FichierUploadCommande from './FichierUploadCommande';
import AjouterFournisseur from '../fournisseurs/AjouterFournisseur';
import AjouterFourniture from '../fournitures/AjouterFourniture';
import Modal from 'react-bootstrap/Modal';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/commande'
})

class AjouterCommande extends Component {

  constructor(props) {
    super(props)
    this.state = {
      date_livraison: "",
      numero_bon_commande: "",
      quantité: "",
      fournisseur_id: "",
      fourniture_id: "",
      commandes_fichier_id:"",
      fournisseurs: props.fournisseurs,
      fournitures:props.fournitures ,
      show: false,
      show_: false,
      state: "",
      message:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.handlerClick_1 = this.handlerClick_1.bind(this);
    this.handlerClick_2 = this.handlerClick_2.bind(this);
    this.handlerClickNew_2 = this.handlerClickNew_2.bind(this);
    this.handlerKeyUp =  this.handlerKeyUp.bind(this);
    }

  async componentDidMount() {
   
   await this.getOptions();
   this.getSelectedOptions();
  }
 
  async getOptions() {
    this.setState({
         fournisseurs: this.props.fournisseurs,
         fournitures: this.props.fournitures
    })
  }

  handlerClick_1(optionsContainer, searchBox) {
    if (optionsContainer.classList.contains("active") ) {
      optionsContainer.classList.remove("active");
      optionsContainer.classList.add("hide_me");
     
    } else {
       optionsContainer.classList.remove("hide_me");
      let currentActive = document.querySelector(".options-container.active");

      if (currentActive) {
        currentActive.classList.remove("active");
        optionsContainer.classList.add("hide_me");
      }

      optionsContainer.classList.add("active");
      optionsContainer.classList.remove("hide_me");
    }

    searchBox.value = "";
    this.filterList("",[]);

    if (optionsContainer.classList.contains("active")) {
      searchBox.focus();
     
    }
  }
   handlerClick_2(selected,o,optionsContainer) {
      
      selected.innerHTML = o.querySelector("label").innerHTML;
      const plus = document.createElement('i');
      if(selected.getAttribute("name") === "fournisseur")
      {
        plus.id = "plus_fournisseur";
        plus.addEventListener('click', () => this.handleShow());
      }
      else if (selected.getAttribute("name") === "fourniture") {
        plus.id = "plus_fourniture";
        plus.addEventListener('click', () => this.handleShow_());
      }
      
      plus.className = "bi bi-plus-square float-left";
      selected.appendChild(plus);
    
      optionsContainer.classList.remove("active");
      optionsContainer.classList.add("hide_me");
      if (o.querySelector("input").name==="fournisseur") {
        this.setState({
          fournisseur_id:o.querySelector("input").value
        });

      } else if (o.querySelector("input").name==="fourniture") {
        this.setState({
          fourniture_id:o.querySelector("input").value
        });
        
       }
  }
  handlerClickNew_2() {
    
const selectedAll = document.querySelectorAll(".selected");
    selectedAll.forEach((selected) => {
      const optionsContainer = selected.previousElementSibling;
      const options = optionsContainer.querySelectorAll(".option");
      var o = options[options.length - 1];

        o.addEventListener("click", () => this.handlerClick_2(selected, o, optionsContainer));
      
    }
    );
  }
  handlerKeyUp (e,optionsList)  {
    this.filterList(e.target.value,optionsList);
  }
   filterList(searchTerm,optionsList){
    searchTerm = searchTerm.toLowerCase();

    optionsList.forEach((option) => {
      let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
      

      if (label.indexOf(searchTerm) !== -1) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });
  };
  getSelectedOptions() {
   const selectedAll = document.querySelectorAll(".selected");
selectedAll.forEach((selected) => {
  const optionsContainer = selected.previousElementSibling;
  const searchBox = selected.nextElementSibling;

  const optionsList = optionsContainer.querySelectorAll(".option");
  
  selected.addEventListener("click",() => this.handlerClick_1(optionsContainer,searchBox) );

  optionsList.forEach((o) => {
    o.addEventListener("click", () => this.handlerClick_2(selected,o,optionsContainer));
  });

  searchBox.addEventListener("keyup",(e) => this.handlerKeyUp(e,optionsList));


});
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState({
    [event.target.name]:value
    });  
  }
  sendData = async () => {
    const commande = { date_livraison: this.state.date_livraison, numero_bon_commande: this.state.numero_bon_commande, quantité: this.state.quantité, fournisseur_id: this.state.fournisseur_id,fourniture_id:this.state.fourniture_id,commandes_fichier_id:this.state.commandes_fichier_id };
   
   let res = await api.post('/', commande);
    this.setState({
      state: res.data.state,
      message:res.data.message
    })

    setTimeout(
      () => {
        this.setState({
      state: "",
      message:""
    })
      } ,2000);
     
    this.props.parentCallback();
     this.setState({
        quantité: ""
     })
     const options  = document.querySelectorAll(".select-box");
    options.forEach(element => {
      const selected = element.querySelector('.selected');
      const plus = document.createElement('i');
       if (selected.getAttribute("name") === "fourniture") {
        plus.id = "plus_fourniture";
        plus.addEventListener('click', () => this.handleShow_());
         selected.innerHTML = "Fournitures";
          plus.className = "bi bi-plus-square float-left";
        selected.appendChild(plus);
      }
      
    });
  }
  
  handleSubmit(event) {
    this.sendData(); 
    event.preventDefault();
  }
  callbackFunction = (childData) => {
      this.setState({commandes_fichier_id: childData})
  }


 

       //modal animation
 handleClose = async() => {
    this.setState({
      show:false
    })

  };
  handleShow = async () => {
   this.setState({
      show:true
    })
  }
  //********************* */
  handleClose_ = async() => {
    this.setState({
      show_:false
    })
  };
  handleShow_ = async () => {
   this.setState({
      show_:true
    })
  }
  // recuperer les fournisseurs
  async getOptions_() { 
    await api.get('/create').then(res => {
      this.setState({
        fournisseurs: res.data.fournisseurs,
        fournitures:res.data.fournitures
      })
   }
     
    )
  }
  callbackFunction_ = async () => {
    await this.getOptions_();
    this.handlerClickNew_2();
  }
  reload() {
    this.setState({
      date_livraison: "",
      numero_bon_commande: "",
      quantité: "",
      fournisseur_id: "",
      fourniture_id: "",
      commandes_fichier_id:"",
      show: false,
      show_:false
    })
    const options  = document.querySelectorAll(".select-box");
    options.forEach(element => {
      const selected = element.querySelector('.selected');
      const plus = document.createElement('i');
      if(selected.getAttribute("name") === "fournisseur")
      {
        plus.id = "plus_fournisseur";
        plus.addEventListener('click', () => this.handleShow());
        selected.innerHTML = "Fournisseurs";
      }
      else if (selected.getAttribute("name") === "fourniture") {
        plus.id = "plus_fourniture";
        plus.addEventListener('click', () => this.handleShow_());
        selected.innerHTML = "Fournitures";
      }
       plus.className = "bi bi-plus-square float-left";
      selected.appendChild(plus);
    });
     const commande_file = document.getElementById('commande_file');
                commande_file.style.backgroundColor = "";
                commande_file.querySelector("i").classList.remove("bi-file-earmark-check");
                commande_file.querySelector("i").classList.add("bi-upload");
                commande_file.querySelector("button").disabled = false;
     document.querySelector("#fichierForm").reset();
  }
 
  render() {
    return (
      <div>
        <h1>Ajouter Commande</h1>      
        <div className="container pt-0 mt-0" style={{ display: 'block',  paddingRight: 30, paddingLeft: 30 }} >
           <div className="row ">
                <div className="col pb-3 rounded-top" style={{backgroundColor:"#C8D8E4"}}></div>
                <div className="col pb-3 rounded-top" style={{ backgroundColor: "#F2F2F2"}}></div>
                
                </div>
              <div className="row  ">
                <div className="col-2" style={{backgroundColor:"#C8D8E4"}}></div>
                <div className="col-8 p-0">
                 {this.state.state === "success" && this.state.state!== null ? 
                      <div className="alert alert-success m-0">{this.state.message}</div>
                      : null}
                     {this.state.state === "failed" && this.state.state!== null ? 
                      <div className="alert alert-danger  m-0">{this.state.message}</div>
                      : null}
                </div>
                <div className="col-2" style={{ backgroundColor: "#F2F2F2"}}></div>
   
              </div>
          <div className="row">
            <div className="col pt-4 " style={{backgroundColor:"#C8D8E4"}}>
            <div className="row pt-3" >
               <FichierUploadCommande   parentCallback={this.callbackFunction}  ></FichierUploadCommande>

             </div>
              <div className="row ">
                 <Form.Group>
                  <Form.Label>La fourniture:</Form.Label>
                  
                  <div  className="select-box">
                    <div className="options-container hide_me">

                      {this.state.fournitures.map(fourniture =>
                      <div key={fourniture.id} className="option" style={{ position: "relative" }}>
                        <input type="radio" className="radio" name="fourniture" value={fourniture.id} />
                        <label>{fourniture.article}</label>
                      </div>)}

                    </div>

                    <div className="selected" name="fourniture" >
                      <i id="plus_fourniture" className="bi bi-plus-square float-left" onClick={() => this.handleShow_()}></i>
                      Fournitures
                    </div>
                    <div  className="search-box">
                      <input type="text" placeholder="Start Typing..." />

                    </div>
                  </div>
                </Form.Group>
              </div>
              <div className="row" >
<Form.Group>
                  <Form.Label >Quantité :</Form.Label>
                  <Form.Control form="form" name="quantité" type="number" placeholder="Quantité" value={this.state.quantité}
                    onChange={this.handleChange}/>
                </Form.Group>
              </div>

              
            </div>
            <div className="col pt-2 " style={{backgroundColor:"#F2F2F2"}}>
              <div className="row">
                 <Form.Group>
                  <Form.Label>Date De Livraison : </Form.Label>
                  <Form.Control form="form" name="date_livraison" type="date" placeholder="Date de livraison"
                    value={this.state.date_livraison} onChange={this.handleChange} />
                </Form.Group>
              </div>
              <div className="row">
                    <Form.Group>
                  <Form.Label>Numero de Bon Commande:</Form.Label>
                  <Form.Control form="form" name="numero_bon_commande" type="text" placeholder="Numero de Bon Commande"
                    value={this.state.numero_bon_commande} onChange={this.handleChange} />
                </Form.Group>
              </div>
              <div className="row mb-3">
                 <Form.Group>
                  <Form.Label>Nom De fournisseur:</Form.Label>
                    <div form="form" className="select-box">
                      
                    <div className="options-container hide_me">

                      {this.state.fournisseurs.map(fournisseur =>
                      <div key={fournisseur.id} className="option" style={{ position: "relative" }}>
                        <input type="radio" className="radio" name="fournisseur" value={fournisseur.id} />
                        <label>{fournisseur.nom_société}</label>
                      </div>)}

                    </div>
                      <div  className="selected" name="fournisseur">
                        <i id="plus_fournisseur" className="bi bi-plus-square float-left" onClick={() => this.handleShow()}></i>
                      Fournisseurs
                      </div>
                      <div  className="search-box">
                      <input type="text" placeholder="Start Typing..." />
                    </div>

                    
                  </div>
                  

                </Form.Group>
             </div>
            </div>
          </div>
           <div className="row ">
              
                <div className="col-4 p-0" style={{backgroundColor:"#C8D8E4"}}></div>
              <div className="col-4">
                <div className="row">
                  <Button form="form" className="btn " style={{ backgroundColor: "#F2F2F2", color: "black", width: "100%" }} type="submit">
                  Ajoutez Un Fourniture A La Commande
                </Button></div>
              <div className="row ">
                <div className="col-6 pb-3 rounded-bottom" style={{backgroundColor:"#C8D8E4"}}></div>
                <div className="col-6  pb-3 rounded-bottom" style={{ backgroundColor: "#F2F2F2"}}></div>
  
                </div>
              <div className="row bg-lightCoral">
                  <button className="btn" onClick={() => this.reload()} >
                  Terminer L'Ajout
                </button>
                </div>
                 
                </div>
                <div className="col-4 p-0" style={{ backgroundColor: "#F2F2F2"}}></div>
   
              </div>
                 <div className="row ">
                <div className="col-6 pb-3 rounded-bottom" style={{backgroundColor:"#C8D8E4"}}></div>
                <div className="col-6  pb-3 rounded-bottom" style={{ backgroundColor: "#F2F2F2"}}></div>
  
                </div>
          <Form  id="form" className="container mt-0 pt-0" onSubmit={this.handleSubmit}>
          </Form>

        </div>
        
                                     
                                                    {/*                     *****************************
 */}
                      <span style={{width:"fit-content"}}>
{/*                           <button type="button" className="btn btn-primary" onClick={() => this.getFournisseur()}>a</button>
 */}                <Modal  onHide={()=> console.log()} show={this.state.show} onClick={() => this.handleClose} dialogClassName="modal-90w">
              <Modal.Header style={{ paddingBottom: "0px" }} >    
               <Modal.Title>
              <i className="fas fa-times"  style={{cursor:"pointer"}} onClick={this.handleClose}></i>
                </Modal.Title>
                
        </Modal.Header>
        <Modal.Body style={{paddingRight:"10px",paddingLeft:"10px"}}> <AjouterFournisseur parentCallback={this.callbackFunction_} ></AjouterFournisseur></Modal.Body>
      </Modal>
                      </span>
                    
{/*                    ******************** 
 */}
        
                                      
                                                    {/*                     *****************************
 */}
                      <span style={{width:"fit-content"}}>
               <Modal  onHide={()=> console.log()} show={this.state.show_} onClick={() => this.handleClose_} dialogClassName="modal-90w">
              <Modal.Header style={{ paddingBottom: "0px" }} >    
               <Modal.Title>
              <i className="fas fa-times"  style={{cursor:"pointer"}} onClick={this.handleClose_}></i>
                </Modal.Title>
                
        </Modal.Header>
            <Modal.Body style={{ paddingRight: "10px", paddingLeft: "10px" }}> <AjouterFourniture parentCallback={this.callbackFunction_} ></AjouterFourniture></Modal.Body>
      </Modal>
                      </span>
                    
{/*                    ******************** 
 */} 
      </div>
    )
  }
}

export default AjouterCommande 