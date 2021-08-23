import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
 const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/service'
})

 class AfficherService extends Component {
    
     constructor(props) {
         super(props);
   
         this.state = {
             services:[],
             currentPage: 1,
            servicesPerPage: 10,
             pageNumbers: [],
             currentPageNumber: [],
             next: false,
             prev:true
             
         }
          
     }
     componentDidMount() {
         this.pageNumbers();
         this.setState({
            services:this.props.services 
         })
     }
   static  getDerivedStateFromProps(nextProps,state) {  
      if (nextProps !== undefined ) {
         
             return {
                 services: nextProps.services
       };
         }  
     }
  sendData = async() => {
   await  this.props.parentCallback();
    }
     //pagination des service
      indexOfLastService() { return this.state.currentPage * this.state.servicesPerPage};
      indexOfFirstService()  { return this.indexOfLastService() - this.state.servicesPerPage};
     currentServices() { return this.state.services.slice(this.indexOfFirstService(), this.indexOfLastService())}
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
         for (let i = 1; i <= Math.ceil(this.state.services.length / this.state.servicesPerPage); i++){
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
      //editer un service
  edit(service) {
      const selectedService = document.getElementById(service.id);
      const td_1 = document.createElement('td');
      const button_update = document.createElement('button');
      
      const input_service = document.createElement('input');
      input_service.value = service.service;
       
     
      button_update.className = "btn btn-primary";
      button_update.innerHTML = "update";
      button_update.addEventListener('click', () => this.update(service));
      
      td_1.appendChild(input_service);

      selectedService.replaceChild(td_1, selectedService.childNodes[0]);
      selectedService.children[1].replaceChild(button_update, selectedService.children[1].children[0]);
     }
     
     async update(service) {
         const selectedService = document.getElementById(service.id);
         const td_1 = document.createElement('td');
         const button_edit = document.createElement('button');

         td_1.innerHTML = selectedService.childNodes[0].childNodes[0].value;
         button_edit.className = "btn btn-success";
         button_edit.innerHTML = "modifier";
         const newService = {
             id: service.id,
             service: selectedService.childNodes[0].childNodes[0].value
         }
         button_edit.addEventListener('click', () => this.edit(newService))
     
       
      
         selectedService.replaceChild(td_1, selectedService.childNodes[0]);
      selectedService.children[1].replaceChild(button_edit, selectedService.children[1].children[0]); 

         await api.put('/' + service.id, newService)
         .then(res => alert(res.data.message));
      this.sendData();
     }
       delete(service) {
         if (window.confirm("Êtes-vous sûr de supprimer " + service.service)) {
            
             api.delete('/'+service.id)
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
                           <th>Service</th>
                           <th>Modifier</th>
                            <th><i className="bi bi-trash"></i></th>

    </tr>
  </thead>
  <tbody>
                        
    {
      this.currentServices().map(service => 
         <tr key={service.id} id={service.id}>
              <td style={{ paddingTop: "0px", paddingBlockStart: "0px" }} >{service.service}</td>
              <td style={{paddingTop:"0px",paddingBlockStart:"0px"}}> <Button className="btn-success" style={{paddingTop:"0px",paddingBlockStart:"0px"}} onClick={() => {this.edit(service)}} >modifier</Button> </td>    
               <td style={{padding:"0px"}}><i onClick={() => this.delete(service)} className="btn p-0 bg-lightCoral bi bi-x-lg"></i></td> 

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

export default AfficherService
