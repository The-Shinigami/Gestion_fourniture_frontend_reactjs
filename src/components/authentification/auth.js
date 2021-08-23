import axios from "axios";
class Auth {
  constructor() {
    if(localStorage.getItem("Authorization") !== null)
    { this.checkRole(); }
    this.utilisateur = "";
}
  async  login(cb) {
      localStorage.setItem("authenticated", true);  
    cb();
      window.location.reload();
    }
 async logout() {
      axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
   await axios.post('http://127.0.0.1:8000/api/logout', {token: localStorage.getItem("token") })
   localStorage.clear();
    }
  async checkRole() {
      axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
   await  axios.post('http://127.0.0.1:8000/api/checkrole')
      .then(response =>  {
       if (response.data.utilisateur !== null) {
          localStorage.setItem("role", response.data.utilisateur.role)
       }     
     });

  }
   async getUtilisateur() {
      axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
   await  axios.post('http://127.0.0.1:8000/api/checkrole')
       .then(response => this.utilisateur = response.data.utilisateur);
     return this.utilisateur;
  }

  
  isAuthenticated() {
        return (localStorage.getItem("authenticated") === "true");
    }
    
    role(role) {    
        localStorage.setItem("role", role);
    }
   isAdmin() {
      return (localStorage.getItem("role") === "admin");
    }
  isSpectateur() {
     return  (localStorage.getItem("role") === "spectateur");
    }
}
export default new Auth();