import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/categorie'
})

class AjouterCatégorie extends Component {

  constructor(props) {
    super(props)
    this.state = {
      catégorie: "",
      catégorie_signification: "",
      sous_catégorie: "",
      sous_catégorie_signification: "",
      catégories: [],
      catégorie_id: "",
      load: false,
      message_catégorie: "",
      message_sous_catégorie: "",
      state_catégorie: "",
      state_sous_catégorie: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitCatégorie = this.handleSubmitCatégorie.bind(this);
    this.handleSubmitSousCatégorie = this.handleSubmitSousCatégorie.bind(this);
  }
 async componentDidMount() {
   await this.getCatégories();
  }
 async getCatégories() {
  await  api.get("/create")
      .then(response => this.setState({
        catégories: response.data.catégories,
        load:true
      }))
}
  handleChange(event) {
    const value = event.target.value;
    this.setState({
    [event.target.name]:value
    });
     
  }
  sendDataCatégorie = async () => {  
      const catégorie = { catégorie:this.state.catégorie,signification:this.state.catégorie_signification };
    await api.post('/', catégorie)
      .then(res => this.setState({
        message_catégorie: res.data.message,
        state_catégorie: res.data.state
      }));
     setTimeout(() => {
          this.setState({
     catégorie:"",catégorie_signification:"",message_catégorie:"",state_catégorie:""
    })      
            }, 3000);
    this.props.parentCallback();
    
  await  this.getCatégories();
  }
  sendDataSousCatégorie = async () => {  
      const sousCatégorie = {sous_catégorie:this.state.sous_catégorie,signification:this.state.sous_catégorie_signification ,catégorie_id:this.state.catégorie_id };
    let res = await api.post('/', sousCatégorie);
     this.setState({
                  message_sous_catégorie: res.data.message,
                  state_sous_catégorie:res.data.state
     });
    
    setTimeout(() => {
              this.setState({
     sous_catégorie:"", sous_catégorie_signification:"",catégorie_id:"", message_sous_catégorie:"",state_sous_catégorie:""
    })  
    }, 3000);
    this.props.parentCallback();
   
  }
  handleSubmitCatégorie(event) {    
   this.sendDataCatégorie();
    event.preventDefault();
  }
  handleSubmitSousCatégorie(event) {    
   this.sendDataSousCatégorie();
    event.preventDefault();
  }

  render() {
    return (
      <div>
         <h1>Ajouter Catégorie et  Sous Catégorie</h1>  
        <div className="container mt-0 pt-0" style={{ display: 'block',  
                  padding: 30 }}>
         
            <div className="row">
                        <div className="col p-5 rounded" style={{ backgroundColor: "#C8D8E4" }}>
                            <div className="row">
                                <div className="col">
                                     <h2>Catégorie</h2>
                                </div>
              </div>
              <div className="row">
                  <div className="col">
                    {this.state.state_catégorie === "success" && this.state.state_catégorie!== null ? 
                      <div className="alert alert-success">{this.state.message_catégorie}</div>
                      : null}
                     {this.state.state_catégorie === "failed" && this.state.state_catégorie!== null ? 
                      <div className="alert alert-danger">{this.state.message_catégorie}</div>
                      : null}
                   </div>
              <div className="row">
                
                </div>
                  <Form.Group >
          <Form.Label>Catégorie : </Form.Label>
          <Form.Control form="formCatégorie" name="catégorie" type="text" 
                        placeholder="Catégorie" value={this.state.catégorie} onChange={this.handleChange} />
                </Form.Group>
              </div>
              <div className="row">
                      <Form.Group >
          <Form.Label>signification: </Form.Label>
          <Form.Control form="formCatégorie" name="catégorie_signification" type="text" 
                        placeholder="Signification" value={this.state.catégorie_signification} onChange={this.handleChange} />
                </Form.Group>       
                        </div>
                  <div className="row pt-4">
                      <Button form="formCatégorie" style={{ backgroundColor: "#F2F2F2", color: "black", width:"100%"}}  type="submit">
       <strong>Ajoutez Catégorie</strong>   
        </Button>          
                   </div>
               
                  </div>
            <div className="col p-5 rounded" style={{ backgroundColor: "#F2F2F2" }}>
                <div className="row">
                            <div className="col">
                                   <h2>Sous Catégorie</h2>
                            </div>

              </div>
              <div className="row">
                  <div className="col">
                    {this.state.state_sous_catégorie === "success" && this.state.state_sous_catégorie !== null ? 
                      <div className="alert alert-success">{this.state.message_sous_catégorie}</div>
                      : null}
                     {this.state.state_sous_catégorie === "failed" && this.state.state_sous_catégorie !== null ? 
                      <div className="alert alert-danger">{this.state.message_sous_catégorie}</div>
                      : null}
                </div>
                </div>
              <div className="row">
                <div className="col">
                  <select form="formSousCatégorie" name="catégorie_id" className="form-select" value={this.state.catégorie_id} onChange={this.handleChange}>
                  <option value="catégories">Catégories</option>
                  {this.state.load?
                    this.state.catégories.map(catégorie =>
                      <option key={catégorie.id} value={catégorie.id}>{catégorie.catégorie}</option>)
                              :null }
                            </select>
                            </div>
                
                        </div>
                        <div className="row">
                              <Form.Group >
          <Form.Label>Sous Catégorie : </Form.Label>
          <Form.Control form="formSousCatégorie" name="sous_catégorie" type="text" 
                        placeholder="Sous Catégorie" value={this.state.sous_catégorie} onChange={this.handleChange} />
      </Form.Group>
              </div>
               <div className="row">
                              <Form.Group >
          <Form.Label>signification: </Form.Label>
          <Form.Control form="formSousCatégorie" name="sous_catégorie_signification" type="text" 
                        placeholder="Signification" value={this.state.sous_catégorie_signification} onChange={this.handleChange} />
                </Form.Group> 
                        </div>
                        <div className="row pt-4"></div>
                     <Button form="formSousCatégorie" style={{ backgroundColor: "#F2F2F2", color: "black", width:"100%"}}  type="submit">
       <strong>Ajoutez Sous Catégorie</strong>   
        </Button>
              </div>
               
             
            </div>
            
            
            <Form id="formCatégorie"  onSubmit={this.handleSubmitCatégorie}> 
                </Form>
                 <Form id="formSousCatégorie"  onSubmit={this.handleSubmitSousCatégorie}> 
          </Form>
     
    </div>
 
      </div>
    )
  }
}

export default AjouterCatégorie 