import React, { Component } from 'react'
import auth from '../authentification/auth'
import Home from '../Home';
import HomeSpectateur from '../HomeSpectateur'
import { Form } from 'react-bootstrap';
import axios from 'axios'
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
 const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/utilisateur'
})
export class HomeProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: "", nom: "", prenom: "", num_tel: "", service_id: "", login: "", password: "",
            role: localStorage.getItem("role"),
            load: false,
            state: "",
            message:""
        
        }
      this.handleChange =  this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
  async  componentDidMount() {
      await this.getUtilisateur();
        
    }
  async  getUtilisateur() {
  await     auth.getUtilisateur()
        .then(data =>  (this.setState({
           id:data.id,nom:data.nom,prenom:data.prenom,num_tel:data.num_tel,login:data.login,password:data.password,role:data.role,service_id:data.service_id
          ,load:true
        }))
        )
    }
    handleChange(event) {
        const value = event.target.value;
       
    this.setState({
         [event.target.name]:value 
    });
     
  }
      handleSubmit(event) {    
   this.sendData();
    event.preventDefault();
    }
  async sendData() {
    
     const utilisateur = { id: this.state.id, nom: this.state.nom, prenom: this.state.prenom, num_tel: this.state.num_tel, login: this.state.login, password: this.state.password, role: this.state.role, service_id:this.state.service_id}
     
    const res = await api.put('/' + utilisateur.id, utilisateur);
   
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
      , 2000);
 await this.getUtilisateur();
    }
    render() {
        return (
            <div >
                 {this.state.role === "admin" ? <Home></Home> : null}
                {this.state.role === "spectateur" ? <HomeSpectateur></HomeSpectateur> : null}
                <div id="content">
                   {!this.state.load ?
          <div className=" spinner-border m-auto" style={{ position: "relative",top:"250px" }}  role="status">
                    <span className="sr-only">Loading...</span>
                    </div>:null}
                {this.state.load ?
                    <div>
                <div >
                                <div className='container mt-0 pt-0'>
                       
            <h1 >votre Profil</h1>
                        <div className="row justify-content-center pt-3">
                            <div className="col-10 col-xs-10 col-md-8 col-lg-6 p-3" style={{backgroundColor:"#C8D8E4"}}>
                                            <Form onSubmit={this.handleSubmit}>
                                                
            <div className="row  ">
              
                <div className="col">
                 {this.state.state === "success" && this.state.state!== null ? 
                      <div className="alert alert-success m-0">{this.state.message}</div>
                      : null}
                     {this.state.state === "failed" && this.state.state!== null ? 
                      <div className="alert alert-danger  m-0">{this.state.message}</div>
                      : null}
                </div>
               
   
              </div>
                                <div className="row">
                                        <div className="col">
                                            <div className="row">
                                             <Form.Group >
                                            <Form.Label><strong>Nom :</strong></Form.Label>
                                            <Form.Control  name="nom" type="text" placeholder="Nom" value={this.state.nom} onChange={this.handleChange} />
                                            </Form.Group>
                                            </div>
                                            <div className="row">
                                              <Form.Group >
                                            <Form.Label><strong>Prenom :</strong></Form.Label>
                                            <Form.Control  name="prenom" type="text" placeholder="Prenom" value={this.state.prenom} onChange={this.handleChange} />
                                            </Form.Group>
                                            </div>
                                            <div className="row">
                                                 <Form.Group >
                                            <Form.Label><strong>Num Tel :</strong></Form.Label>
                                            <Form.Control  name="num_tel" type="text" placeholder="Num Telephone" value={this.state.num_tel} onChange={this.handleChange} />
                                            </Form.Group>
                                            </div>
                                            <div className="row">
                                              <Form.Group >
                                            <Form.Label><strong>Login :</strong></Form.Label>
                                            <Form.Control  name="login" type="text" placeholder="Login" value={this.state.login} onChange={this.handleChange} />
                                            </Form.Group>

                                            </div>
                                            <div className="row">
                                                 <Form.Group >
                                            <Form.Label><strong>Password :</strong></Form.Label>
                                            <Form.Control  name="password" type="text" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                            </Form.Group>

                                            </div>
                                            <div className="row pt-4">
                                                <div className="col">
                                          <button className="btn bg-LightGreen" style={{width:"100%"}}>Modifier</button>
                                              </div>
                                            </div>
                                        </div>
                               </div>
                                </Form>
                            </div>
                    </div>
                    </div>
                        </div>
                        </div>
                :null}  
             </div>
               
            </div>
            
        )
    }
}

export default HomeProfile
