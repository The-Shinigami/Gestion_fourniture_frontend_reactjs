import React, { Component } from "react";
import axios from "axios";
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/demande'
})
export default class Fichiers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fichiers: [],
      status:"failed"
    };
  }
  static getDerivedStateFromProps(nextProps, state) {
    
      if (nextProps !== undefined ) {
        
             return {
                  status: nextProps.loadFichiers
       };
         }  
     }
 async componentDidMount() {
 await   this.getFichiers();
    this.setState({
      status:this.props.loadFichiers
    })
  }

  getFichiers = async() => {
    
  await    api.get("/get/fichiers")
        .then((response) => {
        if (response.status === 200) {
          this.setState({
           fichiers: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  download(fileURL) {
var fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.target = "_blank";
fileLink.setAttribute('download', 'file.pdf'); 
document.body.appendChild(fileLink);
fileLink.click();
  }
  async supprimer(demandes_fichier) {
    if (window.confirm("Êtes-vous sûr de supprimer " + demandes_fichier.nom_fichier +", cette action va supprimer tout les enregistrements liée a ce fichier") ) {
     await api.delete("/" + demandes_fichier.id).then(
      response => alert(response.data.message)
   )
   this.getFichiers();
   }
    
  }

  render() {
    return (
      <div className="container mt-0 pt-0 pr-3 pl-3">
        <div className="row pr-3 pl-3">
          <div className="col m-auto">
            <div >
              
              <div>
                <div className="row">
                  { this.state.status===true ? this.getFichiers():null }
                  {
                    this.state.fichiers.length > 0 ? (
                        this.state.fichiers.map((fichier) => (
                          <div className="col-4 pr-3 pl-3" key={fichier.id}>
                            <embed src={ "http://localhost:8000/uploads/demandes/" +fichier.nom_fichier } className="img-fluid img-bordered" 
                            />
                            <div>
                              <div> <strong>{fichier.nom_fichier}</strong></div>
                              <button type="button" onClick={()=>this.supprimer(fichier) }>supprimer</button>
                            <button type="button" onClick ={() => this.download("http://localhost:8000/uploads/demandes/" + encodeURI(fichier.nom_fichier))}>Consulter</button>
                            </div>
                        </div>
                        ))
                    ) : (
                        <h6 className="text-danger text-center">Aucun Fichiers Trouver </h6>
                    )
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}