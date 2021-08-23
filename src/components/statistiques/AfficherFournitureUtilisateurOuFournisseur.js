import React, { Component } from 'react'
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { ExportCSV } from './ExportCSV';
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");

const api = axios.create({
    baseURL:"http://127.0.0.1:8000/api/statistique"
});
export class AfficherFournitureUtilisateurOuFournisseur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            values:[],
            load:false,
            demandesOuCommandes: [],
            date_label: "",
            utilisateurOufournisseur_label: "",
          quantité_label: "",
          fourniturs: [],
          fourniture_id: "",
          choix: "",
          date_debut: "",
          date_fin: "",
          loadData_utilisateur: false,
          loadData_fournisseur: false,
           nom_fichier:null,
            
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
  async componentDidMount() {
    await this.getFourniture();
    this.getSelectedOptions();
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState({
    [event.target.name]:value
    });  
  }
  async handleSubmit(event) {
    event.preventDefault();
  await  this.sendData(); 
    
  }

 async sendData() {
    
      const data={fourniture_id:this.state.fourniture_id,date_debut:this.state.date_debut,date_fin:this.state.date_fin}
  
    if (this.state.choix.localeCompare("utilisateur") === 0) {
   await   api.post("/getutilisateurfourniture", data)
        .then(response => this.setState({
          demandesOuCommandes: response.data.demandes,
          date_label: "Date de la demande",
          utilisateurOufournisseur_label: "utilisateur",
          quantité_label: "quantité livrai",
              loadData_fournisseur: false,
              loadData_utilisateur: true
      }))
    }
    if (this.state.choix.localeCompare("fournisseur") === 0) {
   await   api.post("/getfournisseurfourniture", data)
        .then(response => this.setState({
        demandesOuCommandes:response.data.commandes,
          date_label: "Date de la livraison",
          utilisateurOufournisseur_label: "fournisseur",
          quantité_label: "quantité livrai",
          loadData_fournisseur: true,
          loadData_utilisateur: false
         
      }))
   }
  }
    async  getFourniture() {
    await   axios.get('http://127.0.0.1:8000/api/fourniture')
            .then(Response => this.setState({
              fournitures: Response.data.fournitures,
              load: true
            }))
  }
   getSelectedOptions() {
     const selectedAll = document.querySelectorAll(".selected");

     selectedAll.forEach((selected) => {
       const optionsContainer = selected.previousElementSibling;
       const searchBox = selected.nextElementSibling;

       const optionsList = optionsContainer.querySelectorAll(".option");

       selected.addEventListener("click", () => {
         if (optionsContainer.classList.contains("active")) {
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
         filterList("");

         if (optionsContainer.classList.contains("active")) {
           searchBox.focus();
         }
       });

       optionsList.forEach((o) => {
         o.addEventListener("click", () => {
           selected.innerHTML = o.querySelector("label").innerHTML;
           optionsContainer.classList.remove("active");
           optionsContainer.classList.add("hide_me");
          if (o.querySelector("input").name === "fourniture") {
             this.setState({
               fourniture_id: o.querySelector("input").value,
               nom_fichier:"fourniture_"+selected.innerHTML+"_"
             });

           }
         });
       });

       searchBox.addEventListener("keyup", function (e) {
         filterList(e.target.value);
       });

       const filterList = (searchTerm) => {
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
     });
   }
    render() {
        
        return (
          <div className="container m-0 p-0 " >
              {!this.state.load ?
          <div className=" spinner-border "  role="status">
                    <span className="sr-only">Loading...</span>
                    </div>:null}
           
              <div className="row justify-content-center">
             
              <div className="row justify-content-center ml-3">
                  {this.state.load ?
              <Form className="row" onSubmit={this.handleSubmit}>
                  <div className="col-3">
                    <div>
                             <Form.Group>
                        <Form.Label>Fourniture : </Form.Label>
                          
          <div className="select-box">
            <div className="options-container hide_me">

                            {this.state.fournitures.map(fourniture =>
              <div key={fourniture.id} className="option">
                <input type="radio" className="radio" name="fourniture" value={fourniture.id} />
                <label>{fourniture.article}</label>
              </div>)}

            </div>
            <div className="selected" name="fourniture">
              Fournitures
            </div>
            <div className="search-box">
              <input type="text" placeholder="Start Typing..." />
            </div>
                        </div>
                        
           
                        </Form.Group>
                   
        </div>
              </div>
                  <div className="col-3">
                     <Form.Group>
                  <Form.Label>Le choix : </Form.Label>
               <select className="form-select" value={this.state.choix} aria-label="Default select example" name="choix" onChange={this.handleChange}>
     <option></option>
   <option value="fournisseur">Fournisseurs</option>
  <option value="utilisateur">Employées</option>
                      </select>
                         </Form.Group>
              </div>
              <div className="col-2">
           <Form.Group>
                  <Form.Label>La date max : </Form.Label>
                  <Form.Control form="form" name="date_fin" type="date" placeholder="Date fin"
                     onChange={this.handleChange} />
                </Form.Group>
              </div>
              <div className="col-2">
                <Form.Group>
                  <Form.Label>La date min :  </Form.Label>
                  <Form.Control form="form" name="date_debut" type="date" placeholder="Date debut"
                     onChange={this.handleChange} />
                </Form.Group>
                  </div>
                  <div className="col-2 mt-4">
                   <button className="btn btn-default"><strong>Chercher</strong></button>
                  </div>
             
                                    </Form>
                        
             : null}
                </div>
              <div className="row justify-content-center mt-4">
                
                <div className="col-11">
<Table striped bordered hover>
  <thead>
    <tr>
      <th>{this.state.date_label}</th>
      <th>{this.state.utilisateurOufournisseur_label}</th>
       <th>{this.state.quantité_label}</th>
    </tr>
  </thead>
                    <tbody>
                      {
                        this.state.loadData_fournisseur  ?
                          this.state.demandesOuCommandes.map(commande =>
                                     < tr key={commande.id}>
                              <td>{commande.date_livraison}</td>
                              <td>{commande.fournisseur}</td>
                               <td>{commande.quantité}</td>
                                      </tr>
                          )
           
                        :null
                      }
                      {
                        this.state.loadData_utilisateur ?
                          this.state.demandesOuCommandes.map(demande =>
                                     < tr key={demande.id}>
                              <td>{demande.date}</td>
                              <td>{demande.utilisateur}</td>
                               <td>{demande.quantité}</td>
                                      </tr>
                          )
           
                        :null
                      }
   
  </tbody>
                  </Table>
                  <ExportCSV csvData={this.state.demandesOuCommandes} file={this.state.nom_fichier}  />
                </div>

                </div>
              </div>
            
         
            </div>
        )
    }
}

export default AfficherFournitureUtilisateurOuFournisseur
