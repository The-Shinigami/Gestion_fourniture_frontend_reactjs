import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import FichierUploadDemande from './FichierUploadDemande'
import AjouterUtilisateur from '../utilisateurs/AjouterUtilisateur';
import AjouterFourniture from '../fournitures/AjouterFourniture';
import Modal from 'react-bootstrap/Modal';
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/demande'
})

class AjouterDemande extends Component {

  constructor(props) {
    super(props)
    this.state = {
      date: "",
      référence: "",
      quantité: "",
      quantité_demandé:"",
      utilisateur_id: "",
      fourniture_id: "",
      demandes_fichier_id:"",
      utilisateurs: props.utilisateurs,
      fournitures:props.fournitures  ,
      show: false,
      show_: false,
      stock:0,
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
         utilisateurs: this.props.utilisateurs,
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
       if (o.querySelector("input").name==="utilisateur") {
        this.setState({
          utilisateur_id:o.querySelector("input").value
        });

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
        var stock = 0;
        const fournitures = this.state.fournitures;
        for (var i = 0; i < fournitures.length; i++){

          if ( Number(fournitures[i].id) === Number(o.querySelector("input").value) ) {
             
            stock = fournitures[i].quantité;
          }
        }
        this.setState({
          fourniture_id: o.querySelector("input").value,
          stock:stock
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
    if (Number(this.state.quantité) > Number(this.state.stock))
     { alert("stock insuffisant");}
    else {
      const demande = { date: this.state.date, référence: this.state.référence, quantité: this.state.quantité,quantité_demandé: this.state.quantité_demandé, utilisateur_id: this.state.utilisateur_id,fourniture_id:this.state.fourniture_id,demandes_fichier_id:this.state.demandes_fichier_id };   
    let res = await api.post('/', demande);
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
        quantité: "",
       fourniture_id: "",
       quantité_demandé: "",
        stock:0
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
    
  }
  
  handleSubmit(event) {
    this.sendData();
    event.preventDefault();
  }
  callbackFunction = (childData) => {
      this.setState({demandes_fichier_id: childData})
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
  // recuperer options
  async getOptions_() { 
    await api.get('/create').then(res => {
      this.setState({
        utilisateurs: res.data.utilisateurs,
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
      date: "",
      référence: "",
      quantité: "",
      quantité_demandé:"",
      utilisateur_id: "",
      fourniture_id: "",
      demandes_fichier_id: "",
      stock:0,
      show: false,
      show_:false
    })
    const options  = document.querySelectorAll(".select-box");
    options.forEach(element => {
      const selected = element.querySelector('.selected');
      const plus = document.createElement('i');
      if(selected.getAttribute("name") === "utilisateur")
      {
        plus.id = "plus_utilisateur";
        plus.addEventListener('click', () => this.handleShow());
        selected.innerHTML = "Utilisateurs";
      }
      else if (selected.getAttribute("name") === "fourniture") {
        plus.id = "plus_fourniture";
        plus.addEventListener('click', () => this.handleShow_());
        selected.innerHTML = "Fournitures";
      }
       plus.className = "bi bi-plus-square float-left";
      selected.appendChild(plus);
    });
     const demande_file = document.getElementById('demande_file');
                demande_file.style.backgroundColor = "";
                demande_file.querySelector("i").classList.remove("bi-file-earmark-check");
                demande_file.querySelector("i").classList.add("bi-upload");
                demande_file.querySelector("button").disabled = false;
     document.querySelector("#fichierForm").reset();
  }

  render() {
    return (
      <div>
        <h1>Ajouter Demande</h1>
           <div className="container pt-0 mt-0 pb-0" style={{ display: 'block',  paddingRight: 30, paddingLeft: 30 }} >
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
            <div className="col pt-3 rounded-top" style={{backgroundColor:"#C8D8E4"}}>
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
                      Fourniture
                    </div>
                    <div  className="search-box">
                      <input type="text" placeholder="Start Typing..." />

                    </div>
                  </div>
                </Form.Group>
              </div>
              
            </div>
            <div className="col pt-5 rounded-top" style={{backgroundColor:"#F2F2F2"}}>
 <div className="row" style={{paddingBottom:"0px"}}>
               <FichierUploadDemande   parentCallback={this.callbackFunction}  ></FichierUploadDemande>

             </div>
            </div>
          </div>
           <div className="row">
            <div className="col  rounded-bottom" style={{backgroundColor:"#C8D8E4"}}>
              <div className="row " >
                <div className="row">
                   <Form.Group>  
                 <Form.Label  > Quantité Demandé :</Form.Label>
                  <Form.Control    form="form"  name="quantité_demandé" type="number" placeholder="Quantité Demandé" value={this.state.quantité_demandé}
                    onChange={this.handleChange} />  
                </Form.Group>
               
                </div>
                <Form.Group>
                  <div className="row ">
                    <div className="col">
                 <Form.Label  > Quantité livré :</Form.Label>
                    </div>     
                  </div> 
                    <div className="row ">
                      <div className="col-10 ">
                         <Form.Control    form="form"  name="quantité" type="number" placeholder="Quantité" value={this.state.quantité}
                    onChange={this.handleChange} />  
                      </div>
                      <div className="col-1 btn pl-1 pr-1">
                         <span>{this.state.stock}</span>
                      </div>
                    </div>
                   
                </Form.Group>
               

                
              </div>
   
            </div>
            <div className="col  rounded-bottom" style={{backgroundColor:"#F2F2F2"}}>
              <div className="row">
                 <Form.Group>
                  <Form.Label>Date De La Demande : </Form.Label>
                  <Form.Control form="form" name="date" type="date" placeholder="Date de La Demande"
                    value={this.state.date} onChange={this.handleChange} />
                </Form.Group>
              </div>
              <div className="row">
                     <Form.Group>
                  <Form.Label>Référence De La Demande:</Form.Label>
                  <Form.Control form="form" name="référence" type="text" placeholder="Référence"
                    value={this.state.référence} onChange={this.handleChange} />
                </Form.Group>
              </div>
              <div className="row mb-3">
                <Form.Group>
                  <Form.Label> Nom De utilisateur:</Form.Label>

                  <div className="select-box">
                    <div className="options-container hide_me">

                      {this.state.utilisateurs.map(utilisateur =>
                      <div key={utilisateur.id} className="option" style={{ position: "relative" }}>
                        <input type="radio" className="radio" name="utilisateur" value={utilisateur.id} />
                        <label>{utilisateur.nom+" "+utilisateur.prenom}</label>
                      </div>)}

                    </div>

                    <div className="selected" name="utilisateur">
                      <i id="plus_utilisateur" className="bi bi-plus-square float-left" onClick={() => this.handleShow()}></i>
                      Utilisateurs
                    </div>
                    <div className="search-box">
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
                 <Button form="form" className="btn " style={{backgroundColor:"#F2F2F2",color:"black",width:"100%"}} type="submit">
                  Ajoutez Un Utilisateur A La Demande
                </Button>
              </div>
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
               <Modal  onHide={()=> console.log()} show={this.state.show} onClick={() => this.handleClose} dialogClassName="modal-90w">
              <Modal.Header style={{ paddingBottom: "0px" }} >    
               <Modal.Title>
              <i className="fas fa-times"  style={{cursor:"pointer"}} onClick={this.handleClose}></i>
                </Modal.Title>
                
        </Modal.Header>
        <Modal.Body style={{paddingRight:"10px",paddingLeft:"10px"}}> <AjouterUtilisateur parentCallback={this.callbackFunction_} ></AjouterUtilisateur></Modal.Body>
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
                    

        
      
      </div>
    )
  }
}

export default AjouterDemande 