import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/fourniture'
})

class AjouterFourniture extends Component {

  constructor(props) {
    super(props)
    this.state = {
      code: "", catégorie_id: "", sous_catégorie_id: "", article: "",
      catégories: [], sousCatégories: [], sousCatégoriesfiltered: [],
      state:"",message:""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
async  componentDidMount() {
  await this.getCatégoriesEtSousCatégories();
 
  }
 async getCatégoriesEtSousCatégories() {
 await   axios.get('http://127.0.0.1:8000/api/categorie')
      .then(response => this.setState({
        catégories: response.data.catégories,
        sousCatégories: response.data.sousCatégories,
        sousCatégoriesfiltered:response.data.sousCatégories
      }))
  }
 
  handleChange(event) {
    var newSousCatégories = [];
    const value = event.target.value;
    this.setState({
    [event.target.name]:value
    });
    if(event.target.name === "catégorie_id")
    {
      newSousCatégories = this.state.sousCatégories.filter(sous_catégorie => parseInt(sous_catégorie.catégorie_id)  === parseInt( value));
    this.setState({
      sousCatégoriesfiltered:newSousCatégories
    });
    }
  }
  sendData = async () => {
    
    const fourniture = { code: this.state.code, catégorie_id: this.state.catégorie_id, sous_catégorie_id: this.state.sous_catégorie_id, article: this.state.article };
    let res = await api.post('/', fourniture);
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
        code: "",
        catégorie_id: "",
        sous_catégorie_id: "",
        article: ""
    })
    const selects = document.querySelectorAll(".form-select");
    selects.forEach(element => {
      element.value = "default";
    });
    
  }
  
  handleSubmit(event) {    
    this.sendData();
    event.preventDefault();
  }

  render() {
    return (
      <div>
         <h1>Ajouter Fourniture</h1>  
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
             <div className="col p-5 " style={{backgroundColor:"#C8D8E4"}}>
                <div className="row"> <Form.Group>
                  <Form.Label><strong><span style={{color:"red"}}> * </span>Catégorie:</strong></Form.Label>
                  <select id="catégorie" required className="form-select" name="catégorie_id"  onChange={this.handleChange} aria-label="Default select example">
                    <option value="default">Catégories</option>
                    {this.state.catégories.map(catégorie => <option key={catégorie.id} value={catégorie.id}>{catégorie.catégorie}</option>)}
</select>
       </Form.Group></div>
                <div className="row">
                 <Form.Group>
                  <Form.Label><strong><span style={{color:"red"}}> * </span>Sous Catégorie:</strong></Form.Label>
                  <select required className="form-select" name="sous_catégorie_id"  onChange={this.handleChange} aria-label="Default select example">
                    <option value="default">Sous Catégories</option>
                    {this.state.sousCatégoriesfiltered.map(sous_catégorie => <option key={sous_catégorie.id} value={sous_catégorie.id}>{sous_catégorie.sous_catégorie}</option>)}
</select>
       </Form.Group></div>
        
     
              </div>
              <div className="col  p-5 " style={{backgroundColor:"#F2F2F2"}}>
                <div className="row"><Form.Group >
          <Form.Label><strong><span style={{color:"red"}}> * </span>Code : </strong></Form.Label>
          <Form.Control required name="code" type="text" 
                        placeholder="Code" value={this.state.code} onChange={this.handleChange} />
                </Form.Group></div>
                <div className="row">
                  <Form.Group>
          <Form.Label><strong><span style={{color:"red"}}> * </span>L'article :</strong></Form.Label>
          <Form.Control required name="article" type="text" 
                        placeholder="Article" value={this.state.article} onChange={this.handleChange} />
        </Form.Group>
                </div>
              
          </div> 
             
            </div>
             <div className="row ">
              
                <div className="col-4" style={{backgroundColor:"#C8D8E4"}}></div>
                <div className="col-4 p-0">
                <Button style={{ backgroundColor: "#F2F2F2", color: "black", width:"100%"}}  type="submit">
       <strong>Ajoutez Fourniture</strong>   
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

export default AjouterFourniture 