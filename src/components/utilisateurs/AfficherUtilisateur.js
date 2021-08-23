import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
 const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/utilisateur'
})

 class AfficherUtilisateur extends Component {
    
     constructor(props) {
         super(props);
   
         this.state = {
             utilisateurs:[],
             utilisateurToEdit: [],
             currentPage: 1,
             utilisateursPerPage: 10,
             pageNumbers: [],
             currentPageNumber: [],
             next: false,
             prev: true,
             services:""
             
         }
          
     }
     componentDidMount() {
         this.pageNumbers();
         this.setState({
             utilisateurs: this.props.utilisateurs,
             services:this.props.services
         })
     }
  static  getDerivedStateFromProps(nextProps,state) {  
      if (nextProps !== undefined ) {
         
             return {
                 utilisateurs: nextProps.utilisateurs
       };
         }  
     }
 sendData = () => {
         this.props.parentCallback();
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
      //editer un utilisateur
  edit(utilisateur) {
      const selectedUtilisateur = document.getElementById(utilisateur.id);
      const td_1 = document.createElement('td');
      const td_2 = document.createElement('td');
      const td_3 = document.createElement('td');
      const td_4 = document.createElement('td');
      const td_5 = document.createElement('td');
      const td_6 = document.createElement('td');
      const td_7 = document.createElement('td');
      const button_update = document.createElement('button');
      
      const input_nom = document.createElement('input');
      input_nom.value = utilisateur.nom;
      input_nom.style.width = "70px";
      const input_prenom = document.createElement('input');
      input_prenom.value = utilisateur.prenom;
      input_prenom.style.width = "70px";

      const input_service = document.createElement('select');
      this.state.services.map(serivce =>
      {
          const option = document.createElement('option');
          option.value = serivce.id;
          option.innerHTML = serivce.service;
          input_service.appendChild(option);
          return null;
      }
        );

      input_service.value = utilisateur.service_id;
      input_service.style.width = "100px";
      

      const input_num_tel = document.createElement('input');
      input_num_tel.value = utilisateur.num_tel;
      input_num_tel.style.width = "100px";
       const input_login = document.createElement('input');
      input_login.value = utilisateur.login;
     input_login.style.width = "100px";
      const input_password= document.createElement('input');
      input_password.value = utilisateur.password;
      input_password.style.width = "100px";
      
      const input_role = document.createElement('select');

      const option_1 = document.createElement('option');
      option_1.value = "admin";
      option_1.innerHTML = "admin";
      input_role.appendChild(option_1);
      const option_2 = document.createElement('option');
      option_2.value = "spectateur";
      option_2.innerHTML= "spectateur";
      input_role.appendChild(option_2);
      const option_3 = document.createElement('option');
      option_3.value = "employé";
      option_3.innerHTML = "employé";
      input_role.appendChild(option_3);

      input_role.value = utilisateur.role;
      input_role.style.width = "100px";
      

      button_update.className = "btn btn-primary";
      button_update.innerHTML = "update";
      button_update.addEventListener('click', () => this.update(utilisateur));
      
      td_1.appendChild(input_nom);
      td_2.appendChild(input_prenom);
      td_3.appendChild(input_service);
      td_4.appendChild(input_num_tel);
      td_5.appendChild(input_login);
      td_6.appendChild(input_password);
      td_7.appendChild(input_role);
      
      selectedUtilisateur.replaceChild(td_1, selectedUtilisateur.childNodes[0]);
      selectedUtilisateur.replaceChild(td_2, selectedUtilisateur.childNodes[1]);
      selectedUtilisateur.replaceChild(td_3, selectedUtilisateur.childNodes[2]);
      selectedUtilisateur.replaceChild(td_4, selectedUtilisateur.childNodes[3]);
      selectedUtilisateur.replaceChild(td_5, selectedUtilisateur.childNodes[4]);
      selectedUtilisateur.replaceChild(td_6, selectedUtilisateur.childNodes[5]);
      selectedUtilisateur.replaceChild(td_7, selectedUtilisateur.childNodes[6]);
      selectedUtilisateur.children[7].replaceChild(button_update, selectedUtilisateur.children[7].children[0]);
     }
     
  async  update(utilisateur) {
         const selectedUtilisateur = document.getElementById(utilisateur.id);
         const td_1 = document.createElement('td');
         const td_2 = document.createElement('td');
         const td_3 = document.createElement('td');
         const td_4 = document.createElement('td');
         const td_5 = document.createElement('td');
         const td_6 = document.createElement('td');
         const td_7 = document.createElement('td');
         const button_edit = document.createElement('button');
         td_1.innerHTML = selectedUtilisateur.childNodes[0].childNodes[0].value;
         td_2.innerHTML = selectedUtilisateur.childNodes[1].childNodes[0].value;
         td_3.innerHTML = (selectedUtilisateur.childNodes[2].childNodes[0]).options[(selectedUtilisateur.childNodes[2].childNodes[0]).selectedIndex].text;
         td_4.innerHTML = selectedUtilisateur.childNodes[3].childNodes[0].value;
         td_5.innerHTML = selectedUtilisateur.childNodes[4].childNodes[0].value;
         td_6.innerHTML = selectedUtilisateur.childNodes[5].childNodes[0].value;
         td_7.innerHTML = selectedUtilisateur.childNodes[6].childNodes[0].value;
         button_edit.className = "btn btn-success";
      button_edit.innerHTML = "modifier";
      const newUtilisateur = {
             id:utilisateur.id,
             nom: selectedUtilisateur.childNodes[0].childNodes[0].value,
            prenom : selectedUtilisateur.childNodes[1].childNodes[0].value,
          service: (selectedUtilisateur.childNodes[2].childNodes[0]).options[(selectedUtilisateur.childNodes[2].childNodes[0]).selectedIndex].text,
            service_id:(selectedUtilisateur.childNodes[2].childNodes[0]).options[(selectedUtilisateur.childNodes[2].childNodes[0]).selectedIndex].value,
          num_tel: selectedUtilisateur.childNodes[3].childNodes[0].value,
            login: selectedUtilisateur.childNodes[4].childNodes[0].value,
            password: selectedUtilisateur.childNodes[5].childNodes[0].value,
          role: selectedUtilisateur.childNodes[6].childNodes[0].value
      }
      
         button_edit.addEventListener('click', () => this.edit(newUtilisateur))
     
        
      
      selectedUtilisateur.replaceChild(td_1, selectedUtilisateur.childNodes[0]);
      selectedUtilisateur.replaceChild(td_2, selectedUtilisateur.childNodes[1]);
      selectedUtilisateur.replaceChild(td_3, selectedUtilisateur.childNodes[2]);
      selectedUtilisateur.replaceChild(td_4, selectedUtilisateur.childNodes[3]);
      selectedUtilisateur.replaceChild(td_5, selectedUtilisateur.childNodes[4]);
      selectedUtilisateur.replaceChild(td_6, selectedUtilisateur.childNodes[5]);
      selectedUtilisateur.replaceChild(td_7, selectedUtilisateur.childNodes[6]);
      selectedUtilisateur.children[7].replaceChild(button_edit, selectedUtilisateur.children[7].children[0]); 

      await api.put('/' + utilisateur.id, newUtilisateur)
          .then(res => alert(res.data.message));
      this.sendData();
     }

     delete(utilisateur) {
         if (window.confirm("Êtes-vous sûr de supprimer " + utilisateur.nom + " " + utilisateur.prenom)) {
            
             api.delete('/'+utilisateur.id)
                 .then(response => ( alert(response.data.message))
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
      <th>Nom</th>
      <th>Prenom</th>
      <th>Service</th>
      <th>Num Tel</th>
      <th>Login</th>
      <th>Password</th>
      <th>Role</th>
      <th>modifier</th>
      <th><i className="bi bi-trash"></i></th>
    </tr>
  </thead>
  <tbody>
                        
    {
      this.currentUtilisateurs().map(utilisateur => 
         <tr key={utilisateur.id} id={utilisateur.id}>
      <td style={{paddingTop:"0px",paddingBottom:"0px"}} >{utilisateur.nom}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px"}} >{utilisateur.prenom}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px"}}>{utilisateur.service}</td>
       <td style={{ paddingTop: "0px", paddingBottom: "0px" }}>{utilisateur.num_tel}</td>
        <td style={{paddingTop:"0px",paddingBottom:"0px"}} >{utilisateur.login}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px"}}>{utilisateur.password}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px"}}>{utilisateur.role}</td>
      <td style={{paddingTop:"0px",paddingBottom:"0px"}}> <Button className="btn-success" style={{paddingTop:"0px",paddingBottom:"0px"}} onClick={() => {this.edit(utilisateur)}} >modifier</Button> </td>    
      <td style={{padding:"0px"}}><i onClick={() => this.delete(utilisateur)} className="btn p-0 bg-lightCoral bi bi-x-lg"></i></td> 
          </tr>
                                )
    }
                       <tr>
                           <td colSpan="9">
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

export default AfficherUtilisateur
