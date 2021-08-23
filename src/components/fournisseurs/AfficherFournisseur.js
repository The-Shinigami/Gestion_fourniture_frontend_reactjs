import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
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
             prev:true
             
         }
          
     }
     componentDidMount() {
         this.pageNumbers();
         this.setState({
            fournisseurs:this.props.fournisseurs 
         })
     }
   static  getDerivedStateFromProps(nextProps,state) {  
      if (nextProps !== undefined ) {
         
             return {
                 fournisseurs: nextProps.fournisseurs
       };
         }  
     }
  sendData = async() => {
   await  this.props.parentCallback();
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
      //editer un fournisseur
  edit(fournisseur) {
      const selectedFournisseur = document.getElementById(fournisseur.id);
      const td_1 = document.createElement('td');
      const td_2 = document.createElement('td');
      const td_3 = document.createElement('td');
      const button_update = document.createElement('button');
      
      const input_nom_société = document.createElement('input');
      input_nom_société.value = fournisseur.nom_société;
      const input_representant= document.createElement('input');
      input_representant.value = fournisseur.representant;
       const input_num_tel= document.createElement('input');
      input_num_tel.value = fournisseur.num_tel;

      button_update.className = "btn btn-primary";
      button_update.innerHTML = "update";
      button_update.addEventListener('click', () => this.update(fournisseur));
      
      td_1.appendChild(input_nom_société);
      td_2.appendChild(input_representant);
      td_3.appendChild(input_num_tel);
      selectedFournisseur.replaceChild(td_1, selectedFournisseur.childNodes[0]);
      selectedFournisseur.replaceChild(td_2, selectedFournisseur.childNodes[1]);
      selectedFournisseur.replaceChild(td_3, selectedFournisseur.childNodes[2]);
      selectedFournisseur.children[3].replaceChild(button_update, selectedFournisseur.children[3].children[0]);
     }
     
     async update(fournisseur) {
         const selectedFournisseur = document.getElementById(fournisseur.id);
         const td_1 = document.createElement('td');
         const td_2 = document.createElement('td');
         const td_3 = document.createElement('td');
         const button_edit = document.createElement('button');

         td_1.innerHTML = selectedFournisseur.childNodes[0].childNodes[0].value;
         td_2.innerHTML = selectedFournisseur.childNodes[1].childNodes[0].value;
         td_3.innerHTML = selectedFournisseur.childNodes[2].childNodes[0].value;
         button_edit.className = "btn btn-success";
         button_edit.innerHTML = "modifier";
         const newFournisseur = {
             id: fournisseur.id,
             nom_société: selectedFournisseur.childNodes[0].childNodes[0].value,
             representant: selectedFournisseur.childNodes[1].childNodes[0].value,
             num_tel: selectedFournisseur.childNodes[2].childNodes[0].value
         }
         button_edit.addEventListener('click', () => this.edit(newFournisseur))
     
       
      
         selectedFournisseur.replaceChild(td_1, selectedFournisseur.childNodes[0]);
         selectedFournisseur.replaceChild(td_2, selectedFournisseur.childNodes[1]);
         selectedFournisseur.replaceChild(td_3, selectedFournisseur.childNodes[2]);
      selectedFournisseur.children[3].replaceChild(button_edit, selectedFournisseur.children[3].children[0]); 

         await api.put('/' + fournisseur.id, newFournisseur)
         .then(res => alert(res.data.message));
      this.sendData();
     }
       delete(fournisseur) {
         if (window.confirm("Êtes-vous sûr de supprimer " + fournisseur.nom_société)) {
            
             api.delete('/'+fournisseur.id)
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
                           <th>Nom Société</th>
                           <th>Nom du representant</th>
                           <th>Numero De Telephone</th>
                           <th>Modifier</th>
                            <th><i className="bi bi-trash"></i></th>

    </tr>
  </thead>
  <tbody>
                        
    {
      this.currentFournisseurs().map(fournisseur => 
         <tr key={fournisseur.id} id={fournisseur.id}>
              <td style={{ paddingTop: "0px", paddingBlockStart: "0px" }} >{fournisseur.nom_société}</td>
              <td style={{paddingTop:"0px",paddingBlockStart:"0px"}} >{fournisseur.representant}</td>
              <td style={{paddingTop:"0px",paddingBlockStart:"0px"}} >{fournisseur.num_tel}</td>
              <td style={{paddingTop:"0px",paddingBlockStart:"0px"}}> <Button className="btn-success" style={{paddingTop:"0px",paddingBlockStart:"0px"}} onClick={() => {this.edit(fournisseur)}} >modifier</Button> </td>    
               <td style={{padding:"0px"}}><i onClick={() => this.delete(fournisseur)} className="btn p-0 bg-lightCoral bi bi-x-lg"></i></td> 

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

export default AfficherFournisseur
