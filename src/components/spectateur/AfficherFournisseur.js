import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import auth from '../authentification/auth'
import HomeSpectateur from '../HomeSpectateur'
import ChercherFournisseur from '../fournisseurs/ChercherFournisseur'

 const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/fournisseur'
})

 class AfficherFournisseur extends Component {
    
     constructor(props) {
         super(props);
   
         this.state = {
             fournisseurs:[],
             currentPage: 1,
            fournisseursPerPage: 10,
             pageNumbers: [],
             currentPageNumber: [],
             next: false,
             prev: true,
             laod:false
             
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
         await this.getFournisseurs();
         await this.pageNumbers();
         
     }
 // recuperer les fournisseurs
  async getFournisseurs() { 
   await api.get('/').then(res => {
       this.setState({
           fournisseurs: res.data.fournisseurs,
           load:true})
   }
     
    )
  }
     //pagination des fournisseur
      indexOfLastFournisseur() { return this.state.currentPage * this.state.fournisseursPerPage};
      indexOfFirstFournisseur()  { return this.indexOfLastFournisseur() - this.state.fournisseursPerPage};
     currentFournisseurs() { return this.state.fournisseurs.slice(this.indexOfFirstFournisseur(), this.indexOfLastFournisseur())}
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
         for (let i = 1; i <= Math.ceil(this.state.fournisseurs.length / this.state.fournisseursPerPage); i++){
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
     //get data to searsh
    childToParent = (childdata) => {
      this.setState({
        fournisseurs:childdata
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
                                   <td colSpan="3" className="p-3">
                                                  <ChercherFournisseur childToParent={ this.childToParent} ></ChercherFournisseur>

                                   </td>
                               </tr>
    <tr>
                                   <th>Nom Société</th>
                                   <th>Nom representant</th>
                           <th>Numero De Telephone</th>
                           
    </tr>
  </thead>
  <tbody>
                        
    {
      this.currentFournisseurs().map(fournisseur => 
         <tr key={fournisseur.id} id={fournisseur.id}>
              <td style={{ paddingTop: "0px", paddingBlockStart: "0px" }} >{fournisseur.nom_société}</td>
                            <td style={{ paddingTop: "0px", paddingBlockStart: "0px" }} >{fournisseur.representant}</td>
              <td style={{paddingTop:"0px",paddingBlockStart:"0px"}} >{fournisseur.num_tel}</td>
    </tr>
                                )
    }
                       <tr>
                           <td colSpan="5">
                               <nav ><ul className='pagination'>
                                    <Pagination.First onClick = {() => this.firstPage()} disabled={this.state.prev} />
                           <Pagination.Prev onClick = {() => this.prevPage()} disabled={this.state.prev} />
                           {
                             this.state.currentPageNumber.map(number =>
                             <li className='page-item' key={number} >
                               <a href="#/"  name={number} onClick={() => this.paginate(number)} className='page-link'>
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

export default AfficherFournisseur
