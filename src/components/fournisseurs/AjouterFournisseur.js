import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/fournisseur'
})

class AjouterFournisseur extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nom_société: "", num_tel: "", representant: "",
      state:"",message:""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
    [event.target.name]:value
    });
     
  }
  sendData = async () => {  
      const fournisseur = { nom_société: this.state.nom_société,num_tel:this.state.num_tel,representant:this.state.representant };
    let res = await api.post('/', fournisseur);
    this.setState({
      state: res.data.state,
      message:res.data.message
    })

    setTimeout(
      () => {
        this.setState({
      state: "",
      message:""
    })
      }
      ,2000);
    this.props.parentCallback();
    this.setState({
      nom_société: "",
      num_tel: "",
      representant:""
    })
  }
  
  handleSubmit(event) {    
   this.sendData();
    event.preventDefault();
  }

  render() {
    return (
      <div>
         <h1>Ajouter Fournisseur</h1>  
        <div style={{ display: 'block',  
                  padding: 30 }}>
          <Form className="container mt-0 pt-0" onSubmit={this.handleSubmit}>
                <div className="row ">
                <div className="col pb-3 rounded-top" style={{backgroundColor:"#C8D8E4"}}></div>
                <div className="col pb-3 rounded-top" style={{ backgroundColor: "#F2F2F2"}}></div>
                
                </div>
              <div className="row  ">
                <div className="col-2" style={{backgroundColor:"#C8D8E4"}}></div>
                <div className="col-8 p-0">
                 {this.state.state === "success" && this.state.state!== null ? 
                      <div className="alert alert-success m-0">{this.state.message}</div>
                      : null}
                     {this.state.state === "failed" && this.state.state!== null ? 
                      <div className="alert alert-danger  m-0">{this.state.message}</div>
                      : null}
              </div>
                              <div className="col-2" style={{ backgroundColor: "#F2F2F2"}}></div>
              </div>
            <div className="row">
             <div className="col p-5" style={{backgroundColor:"#C8D8E4"}}>
                <div className="row">
                  <Form.Group >
          <Form.Label><span style={{color:"red"}}> * </span>Nom De La Sociéte : </Form.Label>
          <Form.Control required name="nom_société" type="text" 
                        placeholder="Nom société" value={this.state.nom_société} onChange={this.handleChange} />
                </Form.Group>
              </div>
      
               
                  </div>
              <div className="col p-5 " style={{ backgroundColor: "#F2F2F2" }}>
                <div className="row">
                  <div className="col">
                <Form.Group >
                  <Form.Label>Numero de Telephone : </Form.Label>
                  <Form.Control name="num_tel" type="text" 
                                placeholder="Num Telephone" value={this.state.num_tel} onChange={this.handleChange} />
                </Form.Group> 
                   </div>
                </div>
                 <div className="row">
                  <div className="col">
                     <Form.Group >
                  <Form.Label>Nom et prenom de Representant  : </Form.Label>
                  <Form.Control name="representant" type="text" 
                                placeholder="Nom et prenom de Representant" value={this.state.representant} onChange={this.handleChange} />
                </Form.Group> 
                   </div>
                </div>
  
              </div>
               
             
            </div>
            <div className="row ">
              
                <div className="col-4" style={{backgroundColor:"#C8D8E4"}}></div>
                <div className="col-4 p-0">
                <Button style={{ backgroundColor: "#F2F2F2", color: "black", width:"100%"}}  type="submit">
       <strong>Ajoutez Fournisseur</strong>   
        </Button>
                </div>
                <div className="col-4" style={{ backgroundColor: "#F2F2F2"}}></div>
   
              </div>
                 <div className="row ">
                <div className="col-6 pb-3 rounded-bottom" style={{backgroundColor:"#C8D8E4"}}></div>
                <div className="col-6  pb-3 rounded-bottom" style={{ backgroundColor: "#F2F2F2"}}></div>
  
                </div>
            
          </Form>
     
    </div>
 
      </div>
    )
  }
}

export default AjouterFournisseur 