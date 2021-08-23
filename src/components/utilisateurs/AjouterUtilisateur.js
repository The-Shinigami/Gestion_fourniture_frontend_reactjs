import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/utilisateur'
})

class AjouterUtilisateur extends Component {

  constructor(props) {
    super(props)
    this.state = { nom:"",prenom:"",service_id:"",services:[],num_tel:"",login:"",password:"",role:"",state:"", message:""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }

 async componentDidMount() {
   await this.getServices();
  }
 async getServices()
  {
   await api.get("/create")
     .then(response => this.setState({
        services: response.data.services
     }));
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState({
    [event.target.name]:value
    });
     
  }
  sendData = async () => {
      
    const utilisateur = { nom: this.state.nom, prenom: this.state.prenom, service_id: this.state.service_id, num_tel: this.state.num_tel,login:this.state.login,password:this.state.password,role:this.state.role };
    let res = await api.post('/', utilisateur);
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
      , 3000);
    this.props.parentCallback();
    this.setState({
      nom: "",
      prenom: "",
      service_id: "",
      num_tel: "",
      login: "",
      password: "",
      role: ""
    })
  }
  
  handleSubmit(event) {    
   this.sendData();
    event.preventDefault();
  }

  render() {
    return (
      <div >
        <span ><h1>Ajouter Utilisateur</h1> </span>  
        <div style={{ display: 'block', padding: 30, borderRadius:"120px" }} >
          <Form className="container pt-0 mt-0" onSubmit={this.handleSubmit}>
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
                 
            <div className="row rounded">
              <div className="col p-5 " style={{backgroundColor:"#C8D8E4"}}>
                <div className="row" >
                  <div  className="col">
                     <Form.Group >
                     <Form.Label><strong><span style={{color:"red"}}> * </span>Nom :</strong></Form.Label>
                     <Form.Control required name="nom" type="text" placeholder="Nom" value={this.state.nom} onChange={this.handleChange} />
                     </Form.Group>
                  </div>
                  <div className="col">
                          <Form.Group>       
          <Form.Label><strong><span style={{color:"red"}}> * </span>Prenom :</strong></Form.Label>
          <Form.Control required name="prenom" type="text"  placeholder="Prenom" value={this.state.prenom} onChange={this.handleChange} />
        </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                        <Form.Group>
          <Form.Label><strong><span style={{color:"red"}}> * </span> Service :</strong></Form.Label>
                      <select required name="service_id" className="form-select" value={this.state.service_id} onChange={this.handleChange}>
                        <option value="">Services</option>
                        {
                          this.state.services.map(service =>
                            <option key={service.id} value={service.id} >{service.service}</option> )
                        }
                      </select>
                </Form.Group>
                  </div>
                  <div className="col">
                       <Form.Group>
          <Form.Label><strong><span style={{color:"red"}}> * </span> Numero de Tel :</strong></Form.Label>
          <Form.Control required name="num_tel" type="text" 
                        placeholder="Numero de Telephone" value={this.state.num_tel} onChange={this.handleChange} />
        </Form.Group>
                   </div>
                </div>
              
              </div>
              <div className="col p-5 rounded-top" style={{backgroundColor:"#F2F2F2"}}>
                <div className="row ">
                           <Form.Group>
          <Form.Label><strong> login :</strong></Form.Label>
          <Form.Control name="login" type="text" 
                        placeholder="Login" value={this.state.login} onChange={this.handleChange} />
        </Form.Group>
                </div>
                <div className="row">
                     <Form.Group>
          <Form.Label><strong> Password :</strong></Form.Label>
          <Form.Control name="password" type="text" 
                        placeholder="Password" value={this.state.password} onChange={this.handleChange} />
        </Form.Group>
                </div>
                <div className="row">
                            <Form.Group>
          <Form.Label><strong><span style={{color:"red"}}> * </span> Role :</strong></Form.Label>
      
                    <select required className="form-select" name="role"  value={this.state.role} onChange={this.handleChange}>
                      <option value="">Roles</option>
                      <option value="admin">admin</option>
                      <option value="spectateur">spectateur</option>
                      <option value="employé">employé</option>

                    </select >
        </Form.Group>
                </div>
              </div>
      
            </div>
                    <div className="row  ">
              
                <div className="col-4" style={{backgroundColor:"#C8D8E4"}}></div>
                <div className="col-4 p-0">
                  <Button style={{backgroundColor:"#F2F2F2",color:"black",width:"100%"}}  type="submit">
         <strong>Ajoutez Utilisateur</strong>  
        </Button> 
                </div>
                <div className="col-4" style={{ backgroundColor: "#F2F2F2"}}></div>
   
              </div>
                 <div className="row ">
                <div className="col pb-3 rounded-bottom" style={{backgroundColor:"#C8D8E4"}}></div>
                <div className="col pb-3 rounded-bottom" style={{ backgroundColor: "#F2F2F2"}}></div>
  
                </div>
          </Form>
     
    </div>
 
      </div>
    )
  }
}

export default AjouterUtilisateur