import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
 const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/fourniture'
})

 class AfficherFourniture extends Component {
    
     constructor(props) {
         super(props);
   
         this.state = {
             fournitures:[],
             currentPage: 1,
            fournituresPerPage: 10,
             pageNumbers: [],
             currentPageNumber: [],
             next: false,
             prev: true,
             catégories: [],
             sousCatégories:[]
             
         }
          
     }
   async  componentDidMount() {
   await      this.getCatégoriesEtSousCatégories();
         this.pageNumbers();
         this.setState({
            fournitures:this.props.fournitures 
         })
     }
  static  getDerivedStateFromProps(nextProps,state) {  
      if (nextProps !== undefined ) {
         
             return {
                 fournitures: nextProps.fournitures
       };
         }  
     }
 sendData = () => {
         this.props.parentCallback();
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
      //editer un fourniture
  edit(fourniture) {
      const selectedFourniture = document.getElementById(fourniture.id);
      const td_1 = document.createElement('td');
      const td_4 = document.createElement('td');
      const button_update = document.createElement('button');


      const input_catégorie = document.createElement('select');
      input_catégorie.className = "form-select";

       this.state.catégories.forEach(catégorie => {
           const option = document.createElement('option');
           option.value = catégorie.id;
           option.innerHTML = catégorie.catégorie;
           input_catégorie.appendChild(option);
       });
      input_catégorie.value = fourniture.catégorie_id;

      document.getElementById(fourniture.id + fourniture.catégorie).innerHTML = "";
      document.getElementById(fourniture.id + fourniture.catégorie).append(input_catégorie);
      /******************************* */
       const input_sous_catégorie = document.createElement('select');
      input_sous_catégorie.className = "form-select";

       this.state.sousCatégories.forEach(sous_catégorie => {
           const option = document.createElement('option');
           option.value = sous_catégorie.id;
           option.innerHTML = sous_catégorie.sous_catégorie;
           input_sous_catégorie.appendChild(option);
       });
      input_sous_catégorie.value = fourniture.sous_catégorie_id;

      document.getElementById(fourniture.id + fourniture.sous_catégorie).innerHTML = "";
      document.getElementById(fourniture.id + fourniture.sous_catégorie).append(input_sous_catégorie);
      
      const input_code = document.createElement('input');
      input_code.value = fourniture.code;

      
      
      const input_article = document.createElement('input');
      input_article.value = fourniture.article;
      button_update.className = "btn btn-primary";
      button_update.innerHTML = "update";
      button_update.addEventListener('click', () => this.update(fourniture));
      
      td_1.appendChild(input_code);
      td_4.appendChild(input_article);
      
      selectedFourniture.replaceChild(td_1, selectedFourniture.childNodes[0]);
      selectedFourniture.replaceChild(td_4, selectedFourniture.childNodes[3]);
      selectedFourniture.children[4].replaceChild(button_update, selectedFourniture.children[4].children[0]);
     }
     
     async update(fourniture) {
         const selectedFourniture = document.getElementById(fourniture.id);
         const td_1 = document.createElement('td');
         const td_2 = document.createElement('td');
         const td_3 = document.createElement('td');
         const td_4 = document.createElement('td');
         const button_edit = document.createElement('button');

         td_1.innerHTML = selectedFourniture.childNodes[0].childNodes[0].value;
         td_2.innerHTML = (selectedFourniture.childNodes[1].childNodes[0]).options[(selectedFourniture.childNodes[1].childNodes[0]).selectedIndex].text;
         td_2.id = fourniture.id + (selectedFourniture.childNodes[1].childNodes[0]).options[(selectedFourniture.childNodes[1].childNodes[0]).selectedIndex].text;
         td_3.innerHTML = (selectedFourniture.childNodes[2].childNodes[0]).options[(selectedFourniture.childNodes[2].childNodes[0]).selectedIndex].text;
         td_4.innerHTML = selectedFourniture.childNodes[3].childNodes[0].value;
         button_edit.className = "btn btn-success";
         button_edit.innerHTML = "modifier";
         const newFourniture = {
             id:fourniture.id,
             code: selectedFourniture.childNodes[0].childNodes[0].value,
            catégorie_id : (selectedFourniture.childNodes[1].childNodes[0]).options[(selectedFourniture.childNodes[1].childNodes[0]).selectedIndex].value,
            catégorie : (selectedFourniture.childNodes[1].childNodes[0]).options[(selectedFourniture.childNodes[1].childNodes[0]).selectedIndex].text,
             sous_catégorie: (selectedFourniture.childNodes[2].childNodes[0]).options[(selectedFourniture.childNodes[2].childNodes[0]).selectedIndex].text,
             sous_catégorie_id: (selectedFourniture.childNodes[2].childNodes[0]).options[(selectedFourniture.childNodes[2].childNodes[0]).selectedIndex].value,
          article: selectedFourniture.childNodes[3].childNodes[0].value
      }
         button_edit.addEventListener('click', () => this.edit(newFourniture))
     
      selectedFourniture.replaceChild(td_1, selectedFourniture.childNodes[0]);
      selectedFourniture.replaceChild(td_2, selectedFourniture.childNodes[1]);
      selectedFourniture.replaceChild(td_3, selectedFourniture.childNodes[2]);
      selectedFourniture.replaceChild(td_4, selectedFourniture.childNodes[3]);
      selectedFourniture.children[4].replaceChild(button_edit, selectedFourniture.children[4].children[0]); 

         await api.put('/' + fourniture.id, newFourniture)
         .then(res => alert(res.data.message));
      this.sendData();
     }
   async getCatégoriesEtSousCatégories() {
 await   axios.get('http://127.0.0.1:8000/api/categorie')
      .then(response => this.setState({
        catégories: response.data.catégories,
        sousCatégories:response.data.sousCatégories
      }))
  }
      delete(fourniture) {
         if (window.confirm("Êtes-vous sûr de supprimer " + fourniture.article)) {
            
             api.delete('/'+fourniture.id)
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
      <th>Code</th>
      <th>Catégorie</th>
      <th>Sous Catégorie</th>
      <th>Article</th>
      <th>modifier</th>
      <th><i className="bi bi-trash"></i></th>

    </tr>
  </thead>
  <tbody>
                        
    {
      this.currentFournitures().map(fourniture => 
         <tr key={fourniture.id} id={fourniture.id}>
              <td style={{ paddingTop: "0px", paddingBlockStart: "0px" }} >{fourniture.code}</td>
               <td id={fourniture.id+fourniture.catégorie} style={{paddingTop:"0px",paddingBlockStart:"0px"}} >{fourniture.catégorie}</td>
      <td id={fourniture.id+fourniture.sous_catégorie} style={{paddingTop:"0px",paddingBlockStart:"0px"}}>{fourniture.sous_catégorie}</td>
      <td style={{paddingTop:"0px",paddingBlockStart:"0px"}}>{fourniture.article}</td>
      <td style={{paddingTop:"0px",paddingBlockStart:"0px"}}> <Button className="btn-success" style={{paddingTop:"0px",paddingBlockStart:"0px"}} onClick={() => {this.edit(fourniture)}} >modifier</Button> </td>    
      <td style={{padding:"0px"}}><i onClick={() => this.delete(fourniture)} className="btn p-0 bg-lightCoral bi bi-x-lg"></i></td> 

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

export default AfficherFourniture
