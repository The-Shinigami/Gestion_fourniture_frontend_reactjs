import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/service'
})

class AjouterService extends Component {

  constructor(props) {
    super(props)
    this.state = {
      service: "",
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
      const service = { service: this.state.service};
    let res = await api.post('/', service);
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
      service: ""
    })
  }
  
  handleSubmit(event) {    
   this.sendData();
    event.preventDefault();
  }

  render() {
    return (
      <div>
         <h1>Ajouter Service</h1>  
        <div style={{ display: 'block',  
                  padding: 30 }}>
          <Form className="container mt-0 pt-0" onSubmit={this.handleSubmit}>
               
              <div className="row justify-content-center"  style={{backgroundColor:"#C8D8E4"}}>
                
                <div className="col-10 pt-2 p-0">
                 {this.state.state === "success" && this.state.state!== null ? 
                      <div className="alert alert-success m-0">{this.state.message}</div>
                      : null}
                     {this.state.state === "failed" && this.state.state!== null ? 
                      <div className="alert alert-danger  m-0">{this.state.message}</div>
                      : null}
              </div>
                  
              </div>
            <div className="row">
             <div className="col p-5" style={{backgroundColor:"#C8D8E4"}}>
                <div className="row">
                  <Form.Group >
          <Form.Label><span style={{color:"red"}}> * </span>Service : </Form.Label>
          <Form.Control required name="service" type="text" 
                        placeholder="Service" value={this.state.service} onChange={this.handleChange} />
                </Form.Group>
              </div>
      
               
                  </div> 
            </div>
            <div className="row ">
              
                <div className="col p-0" style={{backgroundColor:"#C8D8E4"}}>
                <Button style={{ backgroundColor: "#F2F2F2", color: "black"}}  type="submit">
       <strong>Ajoutez Service</strong>   
        </Button>
                </div>
               
   
              </div>
                 <div className="row ">
                <div className="col pb-3 rounded-bottom" style={{backgroundColor:"#C8D8E4"}}></div>
  
                </div>
            
          </Form>
     
    </div>
 
      </div>
    )
  }
}

export default AjouterService 