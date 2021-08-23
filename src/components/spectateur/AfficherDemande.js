import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import auth from '../authentification/auth';
import HomeSpectateur from '../HomeSpectateur'
import ChercherDemande from '../demandes/ChercherDemande'


 const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/demande'
})

 class AfficherDemande extends Component {
    
     constructor(props) {
         super(props);
   
         this.state = {
             demandes:[],
             currentPage: 1,
            demandesPerPage:7,
             pageNumbers: [],
             currentPageNumber: [],
             next: false,
           prev: true,
           load:false
             
         }
          
   }
     async componentDidMount() {
          auth.checkRole();
    if (localStorage.getItem("role") !== "spectateur") { this.props.history.push("/");}
    const sidenav = document.getElementById('full-screen-example');
    const content = document.getElementById('content');
         if (sidenav.style.width === "240px") {
             content.style.marginLeft = "240px";
         } else if (sidenav.style.width === "50px") {
             content.style.marginLeft = "50px";
         }
        axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
         await this.getDemandes();
         await this.pageNumbers();
        
     }
        // recuperer les demandes
  async getDemandes() { 
   await api.get('/').then(res => {
       this.setState({
           demandes: res.data.demandes,
       load:true})
   }
     
    )
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
     //get data to searsh
    childToParent = (childdata) => {
      this.setState({
        demandes:childdata
      });      
  }
     render() {
     
       return (
           <div >
          <HomeSpectateur></HomeSpectateur>
                {!this.state.load ?
          <div className=" spinner-border m-auto" style={{ position: "relative",top:"250px",left:"70px" }}  role="status">
                    <span className="sr-only">Loading...</span>
                    </div>:null}
                <div id="content" className=" p-5">
                   {this.state.load ?
                        <Table responsive="xl" striped bordered hover size="sm" style={{margin:"auto", width:"100%"}}>
                 <thead >
                   <tr>
                     <td colSpan="6" className="p-3">
                           <ChercherDemande childToParent={ this.childToParent} ></ChercherDemande>
                     </td>
                   </tr>
    <tr>
      <th>Date <span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("date")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("date")}></i></span></th>
      <th>Référence<span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("référence")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("référence")}></i></span></th>
      <th>Quantité<span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("quantité")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("quantité")}></i></span></th>
      <th>Utilisateur<span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("utilisateur")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("utilisateur")}></i></span></th>
      <th>Article<span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("fourniture")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("fourniture")}></i></span></th>
      <th>fichier</th>
    </tr>
  </thead>
  <tbody>
                        
    {
      this.currentDemandes().map(demande => 
        <tr key={demande.id} id={demande.id}>
      <td style={{paddingTop:"0px",paddingBottom:"0px",width:"100px"}} >{demande.date}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px",wordBreak:"break-all"}} >{demande.référence}</td>
      <td style={{ paddingTop: "0px", paddingBottom: "0px",wordBreak:"break-all" }}>{demande.quantité}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px",wordBreak:"break-all"}} id={demande.id+demande.utilisateur}>{demande.utilisateur}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px",wordBreak:"break-all"}} id={demande.id+demande.fourniture} >{demande.fourniture}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px"}}> <a href="#/" className="btn btn-default" onClick ={() => this.download("http://localhost:8000/uploads/demandes/" + encodeURI(demande.nom_fichier))}><i style={{cursor:"pointer",margin:"auto"}} className="bi bi-file-earmark-text fa-lg" ></i></a> </td>
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
           
                   :null}
            </div>
            
                    
            </div>

        
        )
    }
}

export default AfficherDemande
