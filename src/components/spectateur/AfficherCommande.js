import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import auth from '../authentification/auth'
import HomeSpectateur from '../HomeSpectateur'
import ChercherCommande from '../commandes/ChercherCommande'


 const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/commande'
})

 class AfficherCommande extends Component {
    
     constructor(props) {
         super(props);
   
         this.state = {
             commandes:[],
             currentPage: 1,
            commandesPerPage: 7,
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
         await this.getCommandes();
         await this.pageNumbers();
         
     }
        // recuperer les commandes
  async getCommandes() { 
   await api.get('/').then(res => {
       this.setState({
           commandes: res.data.commandes,
       load:true})
   }
     
    )
  }
  
     //pagination des commande
      indexOfLastCommande() { return this.state.currentPage * this.state.commandesPerPage};
      indexOfFirstCommande()  { return this.indexOfLastCommande() - this.state.commandesPerPage};
   currentCommandes() {return this.state.commandes.slice(this.indexOfFirstCommande(), this.indexOfLastCommande())
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
         for (let i = 1; i <= Math.ceil(this.state.commandes.length / this.state.commandesPerPage); i++){
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
     var commandes = this.state.commandes;
     if (critère === "date_livraison") {
      commandes.sort(function(a, b){
    if(a.date_livraison< b.date_livraison) { return -1; }
    if(a.date_livraison > b.date_livraison) { return 1; }
    return 0;
      })
      
     } else if (critère === "numero_bon_commande") {
         commandes.sort(function(a, b){
    if(a.numero_bon_commande< b.numero_bon_commande) { return -1; }
    if(a.numero_bon_commande > b.numero_bon_commande) { return 1; }
    return 0;
      })
     }else if (critère === "quantité") {
         commandes.sort(function(a, b){
    if(parseInt(a.quantité)< parseInt(b.quantité)) { return -1; }
    if(parseInt(a.quantité)> parseInt(b.quantité)) { return 1; }
    return 0;
      })
     }else if (critère === "fournisseur") {
         commandes.sort(function(a, b){
     if( a.fournisseur.localeCompare(b.fournisseur) === 1) { return -1; }
    if(a.fournisseur.localeCompare(b.fournisseur) === -1) { return 1; }
    return 0;
      })
     }else if (critère === "fourniture") {
         commandes.sort(function(a, b){
    if( a.fourniture.localeCompare(b.fourniture) === 1) { return -1; }
    if(a.fourniture.localeCompare(b.fourniture) === -1) { return 1; }
    return 0;
      })
     }
      this.setState({
  commandes:commandes
       });
   }
   tricro(critère) {
     var commandes = this.state.commandes;
     if (critère === "date_livraison") {
       commandes.sort(function (a, b) {
         if (a.date_livraison < b.date_livraison) { return -1; }
         if (a.date_livraison > b.date_livraison) { return 1; }
         return 0;
       }).reverse()
     }else if (critère === "numero_bon_commande") {
         commandes.sort(function(a, b){
    if(a.numero_bon_commande< b.numero_bon_commande) { return -1; }
    if(a.numero_bon_commande > b.numero_bon_commande) { return 1; }
    return 0;
      }).reverse()
     }else if (critère === "quantité") {
         commandes.sort(function(a, b){
    if(parseInt(a.quantité)< parseInt(b.quantité)) { return -1; }
    if(parseInt(a.quantité)> parseInt(b.quantité)) { return 1; }
    return 0;
      }).reverse()
     }else if (critère === "fournisseur") {
       commandes.sort(function (a, b) {
          
    if( a.fournisseur.localeCompare(b.fournisseur) === 1) { return -1; }
    if(a.fournisseur.localeCompare(b.fournisseur) === -1) { return 1; }
    return 0;
      }).reverse()
     }else if (critère === "fourniture") {
         commandes.sort(function(a, b){
    if( a.fourniture.localeCompare(b.fourniture) === 1) { return -1; }
    if(a.fourniture.localeCompare(b.fourniture) === -1) { return 1; }
    return 0;
      }).reverse()
     }
     this.setState({
  commandes:commandes
       });
     }
      //get data to searsh
    childToParent = (childdata) => {
      this.setState({
        commandes:childdata
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
               <ChercherCommande childToParent={ this.childToParent} ></ChercherCommande>

                                   </td>
                               </tr>
    <tr>
      <th>Date De Livraison <span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("date_livraison")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("date_livraison")}></i></span></th>
      <th>Numero De Bon Commande<span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("numero_bon_commande")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("numero_bon_commande")}></i></span></th>
      <th>Quantité<span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("quantité")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("quantité")}></i></span></th>
      <th>Fournisseur<span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("fournisseur")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("fournisseur")}></i></span></th>
      <th>Article <span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("fourniture")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("fourniture")}></i></span></th>
                
                     <th>fichier</th>
    </tr>
  </thead>
  <tbody>
                        
    {
      this.currentCommandes().map(commande => 
        <tr key={commande.id} id={commande.id}>
      <td style={{paddingTop:"0px",paddingBottom:"0px",wordBreak:"break-all"}} >{commande.date_livraison}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px",wordBreak:"break-all"}} >{commande.numero_bon_commande}</td>
      <td style={{ paddingTop: "0px", paddingBottom: "0px",wordBreak:"break-all" }}>{commande.quantité}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px",wordBreak:"break-all"}} id={commande.id+commande.fournisseur}>{commande.fournisseur}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px",wordBreak:"break-all"}} id={commande.id+commande.fourniture} >{commande.fourniture}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px"}}>{commande.nom_fichier!== "" ?<a href="#/" className="btn btn-default" onClick ={() => this.download("http://localhost:8000/uploads/commandes/" + encodeURI(commande.nom_fichier))}><i style={{cursor:"pointer",margin:"auto"}} className="bi bi-file-earmark-text fa-lg" ></i></a> :null}  </td>
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

export default AfficherCommande
