import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';


axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
 const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/demande'
})

 class AfficherDemande extends Component {
    
     constructor(props) {
         super(props);
   
         this.state = {
             demandes:[],
             currentPage: 1,
            demandesPerPage: 7,
             pageNumbers: [],
             currentPageNumber: [],
             next: false,
           prev: true,
           utilisateur_id: "",
           fourniture_id: "",
             show: false,
         responseMsg: {
                status: "",
                message: "",
                error: "",
         },
         fichier: "",
         demandes_fichier_id:"",
         nom_fichier: "",
         load: false
             
         }
          
   }
     componentDidMount() {
         this.pageNumbers();
         this.setState({
            demandes:this.props.demandes 
         })
   }
   componentWillUnmount() {
     
   }
  static  getDerivedStateFromProps(nextProps,state) {  
      if (nextProps !== undefined ) { 
             return {
                 demandes: nextProps.demandes
       };
         }  
     }
   sendData = () => {
     this.props.parentCallback();
   }
     //pagination des demande
      indexOfLastDemande() { return this.state.currentPage * this.state.demandesPerPage};
      indexOfFirstDemande()  { return this.indexOfLastDemande() - this.state.demandesPerPage};
   currentDemandes() {return this.state.demandes.slice(this.indexOfFirstDemande(), this.indexOfLastDemande())
   }
//barre des numero des pages
     nextPage() {
         if (this.state.currentPageNumber[0] < this.state.pageNumbers[this.state.pageNumbers.length - this.state.currentPageNumber.length]) {
             const pageNumbers = this.state.currentPageNumber;
         for (let i = 1; i <= pageNumbers.length; i++){
              pageNumbers[i-1] =(pageNumbers[i-1]+1);     
             }
             
             this.setState({
                 currentPageNumber: pageNumbers,
                 prev:false
             })
       
         }
         else {
             this.setState({
                 next:true
             })
         }
     }

     lastPage() {
          const pageNumbers = this.state.pageNumbers.slice(this.state.pageNumbers.length-3,this.state.pageNumbers.length);
             
             this.setState({
                 currentPageNumber: pageNumbers,
                 next: true,
                  prev:false,
             })
       
     }
     firstPage() {
          const pageNumbers = this.state.pageNumbers.slice(0,3);
             
             this.setState({
                 currentPageNumber: pageNumbers,
                 prev: true,
                 next:false
             })
       
         }
       prevPage() {
         if (this.state.currentPageNumber[0] > 1) {
             const pageNumbers = this.state.currentPageNumber;
         for (let i = 1; i <= pageNumbers.length; i++){
              pageNumbers[i-1] =(pageNumbers[i-1]-1);     
             }
             
             this.setState({
                 currentPageNumber: pageNumbers,
                 next:false
             })
       
         }
         else {
             this.setState({
                 prev:true,
                 
                 
             })
         }
     }
     pageNumbers (){
         const pageNumbers = [];
         for (let i = 1; i <= Math.ceil(this.state.demandes.length / this.state.demandesPerPage); i++){
             pageNumbers.push(i);
         }
         this.setState({
             pageNumbers: pageNumbers,
             currentPageNumber:pageNumbers.slice(0,3)
         })
     }
     paginate = (Pagenumber) => {
         const allpagenumber = document.querySelectorAll('li a.page-link');
         for (let i = 0; i < allpagenumber.length;i++){
             allpagenumber[i].className = "page-link";
             allpagenumber[i].style.color = "#0d6efd";
         }
         const pagenumber = document.getElementsByName(Pagenumber)[0];
         pagenumber.className = "page-link bg-primary";
         pagenumber.style.color ="white"
         this.setState({
         currentPage:Pagenumber   
         });
     }
      //editer un demande
     edit(demande) {
         const lise_utilisateurs= <div>
                       <div  className="select-box_">
        <div className="options-container_ hide_me">
         
                        {this.props.utilisateurs.map(utilisateur =>
                          <div key={utilisateur.id} className="option_" >
                          <input type="radio" className="radio_"  name="utilisateurToEdit" value={utilisateur.id} />
            <label >{utilisateur.nom + " " +utilisateur.prenom }</label>
                          </div>)}
                         
          </div>
        <div className="selected_" name="utilisateurToEdit"  >
          {demande.utilisateur}
        </div>
        <div className="search-box_">
          <input type="text" placeholder="Start Typing..." />
       </div>
      </div>
       </div>;
       /**************************************************** */
        const lise_fournitures= <div>
                       <div  className="select-box_">
        <div className="options-container_ hide_me">
         
                        {this.props.fournitures.map(fourniture =>
                          <div key={fourniture.id} className="option_" >
                          <input type="radio" className="radio_"  name="fournitureToEdit" value={fourniture.id} />
            <label >{fourniture.article}</label>
                          </div>)}
                         
          </div>
        <div className="selected_" name="fournitureToEdit" >
          {demande.fourniture}
        </div>
        <div className="search-box_">
          <input type="text" placeholder="Start Typing..." />
       </div>
      </div>
       </div>;
       /*************************************************** */
       

ReactDOM.render(
  lise_utilisateurs,
  document.getElementById(demande.id+demande.utilisateur)
       );
       ReactDOM.render(
  lise_fournitures,
  document.getElementById(demande.id+demande.fourniture)
       );
       //****************************** */
       this.setState(
         {
           utilisateur_id: demande.utilisateur_id,
           fourniture_id:demande.fourniture_id
  }
)       
       this.getSelectedOptions();
      const selectedDemande = document.getElementById(demande.id);
      const td_1 = document.createElement('td');
      const td_2 = document.createElement('td');
      const td_3 = document.createElement('td');
       const td_4 = document.createElement('td');
       const td_5 = document.createElement('td');
      const button_update = document.createElement('button');
      const button_fichier = document.createElement('button');
      const icon_button_fichier = document.createElement('i');
       
       icon_button_fichier.className = "bi bi-journal-plus fa-lg";
       button_fichier.setAttribute("type", "button");
       button_fichier.className = "btn";
       button_fichier.addEventListener('click', this.handleShow);
       button_fichier.append(icon_button_fichier);
       const input_date = document.createElement('input');
       input_date.value = demande.date;
      input_date.style.width = "100px";
      const input_référence = document.createElement('input');
      input_référence.value = demande.référence;
      const input_quantité = document.createElement('input');
      input_quantité.value = demande.quantité;
       input_quantité.style.width = "50px";
       const input_quantité_demandé = document.createElement('input');
      input_quantité_demandé.value = demande.quantité_demandé;
         input_quantité_demandé.style.width = "50px";
         
 

      button_update.className = "btn btn-primary";
      button_update.innerHTML = "update";
      button_update.addEventListener('click', () => this.update(demande));
      
      td_1.appendChild(input_date);
      td_2.appendChild(input_référence);
       td_3.appendChild(input_quantité); 
       td_4.appendChild(input_quantité_demandé);
       td_5.appendChild(button_fichier);
       this.setState({
    demandes_fichier_id: demande.demandes_fichier_id,
    nom_fichier:demande.nom_fichier
  });
      selectedDemande.replaceChild(td_1, selectedDemande.childNodes[0]);
      selectedDemande.replaceChild(td_2, selectedDemande.childNodes[1]);
       selectedDemande.replaceChild(td_3, selectedDemande.childNodes[2]);
       selectedDemande.replaceChild(td_4, selectedDemande.childNodes[3]);
      selectedDemande.replaceChild(td_5, selectedDemande.childNodes[7]);
      selectedDemande.children[6].replaceChild(button_update, selectedDemande.children[6].children[0]);
     }
     
   async update(demande) {
      const selectedDemande = document.getElementById(demande.id);
        const td_1 = document.createElement('td');
        const td_2 = document.createElement('td');
        const td_3 = document.createElement('td');
        const td_4 = document.createElement('td');
        const td_5 = document.createElement('td');
     const td_6 = document.createElement('td');
     const td_7 = document.createElement('td');
        const button_edit = document.createElement('button');
        const button_fichier = document.createElement('a');
        const icon_button_fichier = document.createElement('i');
 
     icon_button_fichier.style.cursor = "pointer";
     icon_button_fichier.style.margin = "auto";
     icon_button_fichier.className = "bi bi-file-earmark-text fa-lg";
     button_fichier.setAttribute("href", "#/");
     button_fichier.className = "btn btn-default";
     button_fichier.addEventListener('click',() => this.download("http://localhost:8000/uploads/demandes/" + encodeURI(this.state.nom_fichier)));
     button_fichier.append(icon_button_fichier);
     
     
         td_1.innerHTML = selectedDemande.childNodes[0].childNodes[0].value;
         td_2.innerHTML = selectedDemande.childNodes[1].childNodes[0].value;
         td_3.innerHTML = selectedDemande.childNodes[2].childNodes[0].value;
         td_4.innerHTML = document.querySelector(".selected_[name='utilisateurToEdit']").innerText;
     td_4.id = demande.id + document.querySelector(".selected_[name='utilisateurToEdit']").innerText;
     td_5.innerHTML = document.querySelector(".selected_[name='fournitureToEdit']").innerText;
     td_5.id = demande.id + document.querySelector(".selected_[name='fournitureToEdit']").innerText;
                td_6.innerHTML = selectedDemande.childNodes[3].childNodes[0].value;
     td_7.append(button_fichier); 
     td_1.style.wordBreak = "break-all";
     td_2.style.wordBreak = "break-all";
     td_3.style.wordBreak = "break-all";
     td_4.style.wordBreak = "break-all";
     td_5.style.wordBreak = "break-all";
     td_6.style.wordBreak = "break-all";
     
     const newDemande = {
       id: demande.id,
       date: selectedDemande.childNodes[0].childNodes[0].value,
       référence: selectedDemande.childNodes[1].childNodes[0].value,
       quantité: selectedDemande.childNodes[2].childNodes[0].value,
       quantité_demandé: selectedDemande.childNodes[3].childNodes[0].value,
       utilisateur: document.querySelector(".selected_[name='utilisateurToEdit']").innerText,
       fourniture: document.querySelector(".selected_[name='fournitureToEdit']").innerText,
       utilisateur_id: this.state.utilisateur_id,
       fourniture_id: this.state.fourniture_id,
        demandes_fichier_id:this.state.demandes_fichier_id,
       nom_fichier:this.state.nom_fichier
     }
         button_edit.className = "btn btn-success";
         button_edit.innerHTML = "modifier";
         button_edit.addEventListener('click', () => this.edit(newDemande))
     
       
      
      selectedDemande.replaceChild(td_1, selectedDemande.childNodes[0]);
      selectedDemande.replaceChild(td_2, selectedDemande.childNodes[1]);
     selectedDemande.replaceChild(td_3, selectedDemande.childNodes[2]);
     selectedDemande.replaceChild(td_6, selectedDemande.childNodes[3]);
      selectedDemande.replaceChild(td_4, selectedDemande.childNodes[4]);
     selectedDemande.replaceChild(td_5, selectedDemande.childNodes[5]);
          selectedDemande.replaceChild(td_7, selectedDemande.childNodes[7]);

      selectedDemande.children[6].replaceChild(button_edit, selectedDemande.children[6].children[0]); 
     await api.put('/' + demande.id, newDemande)
     .then(res => alert(res.data.message));
     this.sendData();
     }
     getSelectedOptions() {
   const selectedAll = document.querySelectorAll(".selected_");

selectedAll.forEach((selected) => {
  const optionsContainer = selected.previousElementSibling;
  const searchBox = selected.nextElementSibling;

  const optionsList = optionsContainer.querySelectorAll(".option_");

  selected.addEventListener("click", () => {
    if (optionsContainer.classList.contains("active_") ) {
      optionsContainer.classList.remove("active_");
       optionsContainer.classList.add("hide_me");
      
    } else {
       optionsContainer.classList.remove("hide_me");
      let currentActive = document.querySelector(".options-container_.active_");

      if (currentActive) {
        currentActive.classList.remove("active_");
         optionsContainer.classList.add("hide_me");
      }

      optionsContainer.classList.add("active_");
      optionsContainer.classList.remove("hide_me");
    }

    searchBox.value = "";
    filterList("");

    if (optionsContainer.classList.contains("active_")) {
      searchBox.focus();
    }
  });

  optionsList.forEach((o) => {
    o.addEventListener("click", () => {
      selected.innerHTML = o.querySelector("label").innerHTML;
      optionsContainer.classList.remove("active_");
      optionsContainer.classList.add("hide_me");
      if (o.querySelector("input").name==="utilisateurToEdit") {
        this.setState({
          utilisateur_id:o.querySelector("input").value
        });

      } else if (o.querySelector("input").name==="fournitureToEdit") {
        this.setState({
          fourniture_id:o.querySelector("input").value
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
    download(fileURL) {
var fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.target = "_blank";
fileLink.setAttribute('download', 'file.pdf'); 
document.body.appendChild(fileLink);
fileLink.click();
   }
   tridec(critère) {
     var demandes = this.state.demandes;
     if (critère === "date") {
      demandes.sort(function(a, b){
    if(a.date < b.date) { return -1; }
    if(a.date > b.date) { return 1; }
    return 0;
      })
      
     } else if (critère === "référence") {
         demandes.sort(function(a, b){
    if(a.référence< b.référence) { return -1; }
    if(a.référence > b.référence) { return 1; }
    return 0;
      })
     }else if (critère === "quantité") {
         demandes.sort(function(a, b){
    if(parseInt(a.quantité)< parseInt(b.quantité)) { return -1; }
    if(parseInt(a.quantité)> parseInt(b.quantité)) { return 1; }
    return 0;
      })
     }else if (critère === "quantité_demandé") {
         demandes.sort(function(a, b){
    if(parseInt(a.quantité_demandé)< parseInt(b.quantité_demandé)) { return -1; }
    if(parseInt(a.quantité_demandé)> parseInt(b.quantité_demandé)) { return 1; }
    return 0;
      })
     }else if (critère === "utiliateur") {
         demandes.sort(function(a, b){
     if( a.utiliateur.localeCompare(b.utiliateur) === 1) { return -1; }
    if(a.utiliateur.localeCompare(b.utiliateur) === -1) { return 1; }
    return 0;
      })
     }else if (critère === "fourniture") {
         demandes.sort(function(a, b){
    if( a.fourniture.localeCompare(b.fourniture) === 1) { return -1; }
    if(a.fourniture.localeCompare(b.fourniture) === -1) { return 1; }
    return 0;
      })
     }
      this.setState({
  demandes:demandes
       });
   }
   tricro(critère) {
     var demandes = this.state.demandes;
     if (critère === "date") {
       demandes.sort(function (a, b) {
         if (a.date < b.date) { return -1; }
         if (a.date > b.date) { return 1; }
         return 0;
       }).reverse()
     }else if (critère === "référence") {
         demandes.sort(function(a, b){
    if(a.référence< b.référence) { return -1; }
    if(a.référence > b.référence) { return 1; }
    return 0;
      }).reverse()
     }else if (critère === "quantité") {
         demandes.sort(function(a, b){
    if(parseInt(a.quantité)< parseInt(b.quantité)) { return -1; }
    if(parseInt(a.quantité)> parseInt(b.quantité)) { return 1; }
    return 0;
      }).reverse()
     }else if (critère === "quantité_demandé") {
         demandes.sort(function(a, b){
    if(parseInt(a.quantité_demandé)< parseInt(b.quantité_demandé)) { return -1; }
    if(parseInt(a.quantité_demandé)> parseInt(b.quantité_demandé)) { return 1; }
    return 0;
      }).reverse()
     }else if (critère === "utiliateur") {
       demandes.sort(function (a, b) {
          
    if( a.utiliateur.localeCompare(b.utiliateur) === 1) { return -1; }
    if(a.utiliateur.localeCompare(b.utiliateur) === -1) { return 1; }
    return 0;
      }).reverse()
     }else if (critère === "fourniture") {
         demandes.sort(function(a, b){
    if( a.fourniture.localeCompare(b.fourniture) === 1) { return -1; }
    if(a.fourniture.localeCompare(b.fourniture) === -1) { return 1; }
    return 0;
      }).reverse()
     }
     this.setState({
  demandes:demandes
       });
   }
 delete(demande) {
         if (window.confirm("Êtes-vous sûr de supprimer " + demande.référence)) {
            
             api.delete('/delete/'+demande.id)
                 .then(response =>  alert(response.data.message)
             )
             this.props.parentCallback();
         }
     }
   //modal animation
  handleShow = () => {
     this.setState({
       show: true
  })
   }
   handleClose = () => {
     this.setState({
       show: false
  })
}
   
    // fichier onchange hander
    handleChange = (e) => {
        this.setState({
            fichier: e.target.files[0]
        })
   }
       // submit handler
   async submitHandler() {
     this.setState({
       load:true
     });
        const data = new FormData() 
        data.append('fichier', this.state.fichier)

      await  api.post("/upload", data)
        .then((response) => {
            if (response.status === 200) {
            this.setState({
                responseMsg: {
                status: response.data.status,
                message: response.data.message
              },
              demandes_fichier_id: response.data.demandes_fichier_id,
              nom_fichier:response.data.nom_fichier
            });
             
            setTimeout(() => {
                this.setState({
                  responseMsg: "",
                  show: false,
                  load:false
                });
            }, 3000);        
          }
        })
        .catch((error) => {
            console.error(error);
        });
  }
     render() {
     
       return (
           <div >
            <Modal centered  onHide={()=> console.log()} show={this.state.show} onClick={() => this.handleClose} dialogClassName="modal-90w">
        <Modal.Header style={{paddingBottom:"0px"}}  >
               <Modal.Title style={{width:"100%"}}>
                 <div className="row ">
                  <div className="col-5">
                 <i className="fas fa-times" style={{ cursor: "pointer" }} onClick={this.handleClose}></i>
                   </div>
                   <div className="col-7">
                 <strong className="m-auto">Modifier le fichier</strong>
                   </div>
                 </div>
               </Modal.Title>
               
        </Modal.Header>
             <Modal.Body style={{ paddingRight: "10px", paddingLeft: "10px" }} className="mt-5 mb-5  bg-LightGreen">
               { this.state.load? <div className="  spinner-border position-absolute fixed-top" role="status">
                    <span className="sr-only">Loading...</span>
                </div>:null}
               
               <div className="row">
                  <div className="col-1 p-0">
                    <span >
                    </span>
                      </div>
                       <div className="col-10 p-0">
                  
                    <input
                      type="file"
                      name="fichier"                      
                      onChange={this.handleChange}
                          className="form-control "
                        >
                    </input>
                    
                    
                    <span className="text-danger">
                      {this.state.responseMsg.message}
                    </span>
                    </div>
       
                   <div className="col-1 p-0 m-0"  id="demande_file">
                    <span  > <button style={{ height: "40px",margin:"0px"}} type="button" onClick={() => this.submitHandler()} className="btn" >
                    <i className="bi bi-upload "   ></i>
                   </button></span>
                      </div>
                      </div>
        </Modal.Body>
      </Modal> 
             <Table responsive="xl" striped bordered hover size="sm" style={{margin:"auto", width:"100%"}}>
  <thead >
    <tr>
      <th>Date <span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("date")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("date")}></i></span></th>
      <th>Référence<span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("référence")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("référence")}></i></span></th>
      <th>Quantité<span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("quantité")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("quantité")}></i></span></th>     
      <th>Quantité Demandé<span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("quantité_demandé")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("quantité_demandé")}></i></span></th>
      <th>Utilisateur<span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("utilisateur")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("utilisateur")}></i></span></th>
      <th>Article<span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("fourniture")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("fourniture")}></i></span></th>
      <th>modifier</th>
      <th>fichier</th>
      <th><i className="bi bi-trash"></i></th>

    </tr>
  </thead>
  <tbody>
                        
    {
      this.currentDemandes().map(demande => 
        <tr key={demande.id} id={demande.id}>
      <td style={{paddingTop:"0px",paddingBottom:"0px",width:"95px"}} >{demande.date}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px",wordBreak:"break-all"}} >{demande.référence}</td>
      <td style={{ paddingTop: "0px", paddingBottom: "0px",wordBreak:"break-all" }}>{demande.quantité}</td>
      <td style={{ paddingTop: "0px", paddingBottom: "0px",wordBreak:"break-all" }}>{demande.quantité_demandé}</td>
      <td style={{ paddingTop: "0px", paddingBottom: "0px", wordBreak: "break-all" }} id={demande.id + demande.utilisateur}>{demande.utilisateur}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px",wordBreak:"break-all"}} id={demande.id+demande.fourniture} >{demande.fourniture}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px"}}> <Button className="btn-success" style={{paddingTop:"0px",paddingBlockStart:"0px"}} onClick={() => {this.edit(demande)}} >modifier</Button> </td>    
      <td style={{paddingTop:"0px",paddingBottom:"0px"}}> {demande.nom_fichier !== "" ?<a href="#/" className="btn btn-default" onClick ={() => this.download("http://localhost:8000/uploads/demandes/" + encodeURI(demande.nom_fichier))}><i style={{cursor:"pointer",margin:"auto"}} className="bi bi-file-earmark-text fa-lg" ></i></a> :null} </td>
      <td style={{padding:"0px"}}><i onClick={() => this.delete(demande)} className="btn p-0 bg-lightCoral bi bi-x-lg"></i></td> 
     
        </tr>
                                )
    }
                       <tr>
                           <td colSpan="6">
                               <nav ><ul className='pagination'>
                                    <Pagination.First onClick = {() => this.firstPage()} disabled={this.state.prev} />
                           <Pagination.Prev onClick = {() => this.prevPage()} disabled={this.state.prev} />
                           {
                             this.state.currentPageNumber.map(number =>
                             <li className='page-item' key={number} >
                               <a href='#/'  name={number} onClick={() => this.paginate(number)} className='page-link'>
                                                   {number}
                                </a>
                                                       
                             </li>
                           )
                           
                       }
                                   <Pagination.Next onClick={() => this.nextPage()} disabled={this.state.next} />
                                   <Pagination.Last onClick={() => this.lastPage()} disabled={this.state.next} />
                               </ul>
                           </nav>     
                           </td>
                         
                   </tr>
                                  
 
  </tbody>
               </Table>
           
                    
            </div>

        
        )
    }
}

export default AfficherDemande
