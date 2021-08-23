import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import HomeSpectateur from '../HomeSpectateur'
import auth from '../authentification/auth'
import ChercherUtilisateur from '../utilisateurs/ChercherUtilisateur'


 const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/utilisateur'
})

 class AfficherUtilisateur extends Component {
    
     constructor(props) {
         super(props);
   
         this.state = {
             utilisateurs:[],
             currentPage: 1,
             utilisateursPerPage: 12,
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
    }else if (sidenav.style.width === "50px") {
      content.style.marginLeft = "50px";
    }
    axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
      await  this.getUtilisateurs();
      await  this.pageNumbers();
     }
 // recuperer les utilisateurs
     async getUtilisateurs() {
         await api.get('/').then(res => {
             this.setState({
                 utilisateurs: res.data.utilisateurs,
            load:true })
         }
         )
     }
 
     //pagination des utilisateur
      indexOfLastUtilisateur() { return this.state.currentPage * this.state.utilisateursPerPage};
      indexOfFirstUtilisateur()  { return this.indexOfLastUtilisateur() - this.state.utilisateursPerPage};
     currentUtilisateurs() { return this.state.utilisateurs.slice(this.indexOfFirstUtilisateur(), this.indexOfLastUtilisateur())}
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
         for (let i = 1; i <= Math.ceil(this.state.utilisateurs.length / this.state.utilisateursPerPage); i++){
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
     childToParent = (childdata) => {
         this.setState({
             utilisateurs: childdata
         });
     }
 
     render() {
     
       return (
           <div >
                <HomeSpectateur></HomeSpectateur>
                {!this.state.load ?
          <div className=" spinner-border m-auto" style={{ position: "relative",top:"250px",left:"100px" }}  role="status">
                    <span className="sr-only">Loading...</span>
                    </div>:null}
               <div id="content" className=" p-5">
                   {this.state.load ?
                        <Table responsive="xl" striped bordered hover size="sm" style={{margin:"auto", width:"100%"}}>
                           <thead >
                               <tr>
                                   <td colSpan="4" className="p-3">
                                                      <ChercherUtilisateur childToParent={ this.childToParent} ></ChercherUtilisateur>

                                   </td>
                               </tr>
    <tr>
      <th>Nom</th>
      <th>Prenom</th>
      <th>Service</th>
      <th>Num Tel</th>
    </tr>
  </thead>
  <tbody>
                        
    {
      this.currentUtilisateurs().map(utilisateur => 
         <tr key={utilisateur.id} id={utilisateur.id}>
      <td style={{paddingTop:"0px",paddingBlockStart:"0px"}} >{utilisateur.nom}</td>
      <td style={{paddingTop:"0px",paddingBlockStart:"0px"}} >{utilisateur.prenom}</td>
      <td style={{paddingTop:"0px",paddingBlockStart:"0px"}}>{utilisateur.service}</td>
      <td style={{paddingTop:"0px",paddingBlockStart:"0px"}}>{utilisateur.num_tel}</td>
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
               
                   : null}
               
            </div>
                 
            </div>

        
        )
    }
}

export default AfficherUtilisateur
