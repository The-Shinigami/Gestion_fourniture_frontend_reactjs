import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import HomeSpectateur from '../HomeSpectateur'
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination'
import auth from '../authentification/auth';
import ChercherStock from '../statistiques/chercherStock';
const api = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/statistique'
});
class AfficherStatistique extends Component {

    constructor(props) {
        super(props);
        this.state = {
          fournitures: "",
           currentPage: 1,
            fournituresPerPage: 10,
             pageNumbers: [],
             currentPageNumber: [],
             next: false,
             prev:true,
            load:false
        };
}
  async  componentDidMount() {
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
    await this.getStock();
    this.pageNumbers();
  }
         //pagination des fourniture
      indexOfLastFourniture() { return this.state.currentPage * this.state.fournituresPerPage};
      indexOfFirstFourniture()  { return this.indexOfLastFourniture() - this.state.fournituresPerPage};
     currentFournitures() { return this.state.fournitures.slice(this.indexOfFirstFourniture(), this.indexOfLastFourniture())}
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
         for (let i = 1; i <= Math.ceil(this.state.fournitures.length / this.state.fournituresPerPage); i++){
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

  /********************* */
   async getStock() {
         await  api.get('/stock')
            .then(response =>
                this.setState({
                    fournitures: response.data.fournitures,
                    load:true
            })
        )
    }

        tridec(critère) {
     var fournitures = this.state.fournitures;
      if (critère === "quantité") {
         fournitures.sort(function(a, b){
    if(parseInt(a.quantité)< parseInt(b.quantité)) { return -1; }
    if(parseInt(a.quantité)> parseInt(b.quantité)) { return 1; }
    return 0;
      })
     }else if (critère === "article") {
         fournitures.sort(function(a, b){
    if( a.article.localeCompare(b.article) === 1) { return -1; }
    if(a.article.localeCompare(b.article) === -1) { return 1; }
    return 0;
      })
     }
      this.setState({
  fournitures:fournitures
       });
   }
   tricro(critère) {
     var fournitures = this.state.fournitures;
      if (critère === "quantité") {
         fournitures.sort(function(a, b){
    if(a.quantité< b.quantité) { return -1; }
    if(a.quantité> b.quantité) { return 1; }
    return 0;
      }).reverse()
     }else if (critère === "article") {
         fournitures.sort(function(a, b){
    if( a.article.localeCompare(b.article) === 1) { return -1; }
    if(a.article.localeCompare(b.article) === -1) { return 1; }
    return 0;
      }).reverse()
     }
     this.setState({
  fournitures:fournitures
       });
  }
  childToParent = (childdata) => {
    this.setState({
      fournitures: childdata
    });
  }
    render() {
        return (
            <div>
                <HomeSpectateur></HomeSpectateur>
                {!this.state.load ?
          <div className=" spinner-border m-auto" style={{ position: "relative",top:"250px",left:"70px" }}  role="status">
                    <span className="sr-only">Loading...</span>
                    </div>:null}
                <div id="content" className=" p-5">
                    {this.state.load ? 
                    <Table responsive="xl" striped bordered hover size="sm" style={{margin:"auto", width:"100%"}}>
                  <thead >
                    <tr >
                      <td colSpan="2" className="p-3">
                                              <ChercherStock childToParent={ this.childToParent} ></ChercherStock>

                     </td>
                    </tr>
    <tr> 
      <th>Article<span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("article")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("article")}></i></span></th>    
      <th>Quantité<span style={{float:"right"}}><i style={{cursor:"pointer"}} className="bi bi-caret-down-fill" onClick={() => this.tridec("quantité")} ></i><i style={{cursor:"pointer"}} className="bi bi-caret-up-fill" onClick={() => this.tricro("quantité")}></i></span></th>  
    </tr>
  </thead>
  <tbody>
                        
                        {
                            this.currentFournitures().map(fourniture =>
                                <tr key={fourniture.id} >
                                    <td>{fourniture.article}</td>
                                    <td>{ fourniture.quantité}</td>
                                </tr>
                      )}
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
</Table >
                   
                   : null}
      
            </div>  
            </div>
            
        )
    }
}

export default AfficherStatistique
