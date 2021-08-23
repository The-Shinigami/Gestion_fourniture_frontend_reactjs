import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
 const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/categorie'
})

 class AfficherCatégorie extends Component {
    
     constructor(props) {
         super(props);
   
         this.state = {
             catégories:[],
             currentPage: 1,
            catégoriesPerPage: 10,
             pageNumbers: [],
             currentPageNumber: [],
             next: false,
             prev:true
             
         }
          
     }
     componentDidMount() {
         this.pageNumbers();
         this.setState({
            catégories:this.props.catégories 
         })
     }
   static  getDerivedStateFromProps(nextProps,state) {  
      if (nextProps !== undefined ) {
         
             return {
                 catégories: nextProps.catégories
       };
         }  
     }
  sendData = async() => {
   await  this.props.parentCallback();
    }
     //pagination des catégorie
      indexOfLastCatégorie() { return this.state.currentPage * this.state.catégoriesPerPage};
      indexOfFirstCatégorie()  { return this.indexOfLastCatégorie() - this.state.catégoriesPerPage};
     currentCatégories() { return this.state.catégories.slice(this.indexOfFirstCatégorie(), this.indexOfLastCatégorie())}
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
         for (let i = 1; i <= Math.ceil(this.state.catégories.length / this.state.catégoriesPerPage); i++){
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
      //editer un catégorie
  edit(catégorie) {
      const selectedCatégorie = document.getElementById(catégorie.id);
      const td_1 = document.createElement('td');
      const td_2 = document.createElement('td');
      const button_update = document.createElement('button');
      
      const input_catégorie= document.createElement('input');
      input_catégorie.value = catégorie.catégorie;
       const input_signification= document.createElement('input');
      input_signification.value = catégorie.signification;
      button_update.className = "btn btn-primary";
      button_update.innerHTML = "update";
      button_update.addEventListener('click', () => this.update(catégorie));
      
      td_1.appendChild(input_catégorie);
      td_2.appendChild(input_signification);
      selectedCatégorie.replaceChild(td_1, selectedCatégorie.childNodes[0]);
      selectedCatégorie.replaceChild(td_2, selectedCatégorie.childNodes[1]);
      selectedCatégorie.children[2].replaceChild(button_update, selectedCatégorie.children[2].children[0]);
     }
     
     async update(catégorie) {
         const selectedCatégorie = document.getElementById(catégorie.id);
         const td_1 = document.createElement('td');
         const td_2 = document.createElement('td');
         const button_edit = document.createElement('button');

         td_1.innerHTML = selectedCatégorie.childNodes[0].childNodes[0].value;
         td_2.innerHTML = selectedCatégorie.childNodes[1].childNodes[0].value;
         button_edit.className = "btn btn-success";
         button_edit.innerHTML = "modifier";
         const newCatégorie = {
             id: catégorie.id,
             catégorie: selectedCatégorie.childNodes[0].childNodes[0].value,
             signification: selectedCatégorie.childNodes[1].childNodes[0].value
         }
         button_edit.addEventListener('click', () => this.edit(newCatégorie))
     
       
      
         selectedCatégorie.replaceChild(td_1, selectedCatégorie.childNodes[0]);
       selectedCatégorie.replaceChild(td_2, selectedCatégorie.childNodes[1]);
      selectedCatégorie.children[2].replaceChild(button_edit, selectedCatégorie.children[2].children[0]); 

         await api.put('/' + catégorie.id, newCatégorie)
         .then(res => alert(res.data.message));
      this.sendData();
     }
       delete(catégorie) {
         if (window.confirm("Êtes-vous sûr de supprimer " + catégorie.catégorie)) {
            
             api.delete('/delete/'+catégorie.id)
                 .then(response =>  alert(response.data.message)
             )
             this.props.parentCallback();
         }
     } 
     render() {
     
       return (
           <div >
            
             <Table responsive="xl" striped bordered hover size="sm" style={{margin:"auto", width:"100%"}}>
  <thead >
    <tr>
                           <th>Catégorie</th>
                           <th>Signification</th>
                           <th>Modifier</th>
                            <th><i className="bi bi-trash"></i></th>

    </tr>
  </thead>
  <tbody>
                        
    {
      this.currentCatégories().map(catégorie => 
         <tr key={catégorie.id} id={catégorie.id}>
              <td style={{ paddingTop: "0px", paddingBlockStart: "0px" }} >{catégorie.catégorie}</td>
              <td style={{paddingTop:"0px",paddingBlockStart:"0px"}} >{catégorie.signification}</td>
              <td style={{paddingTop:"0px",paddingBlockStart:"0px"}}> <Button className="btn-success" style={{paddingTop:"0px",paddingBlockStart:"0px"}} onClick={() => {this.edit(catégorie)}} >modifier</Button> </td>    
               <td style={{padding:"0px"}}><i onClick={() => this.delete(catégorie)} className="btn p-0 bg-lightCoral bi bi-x-lg"></i></td> 

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
           
                    
            </div>

        
        )
    }
}

export default AfficherCatégorie
