import React, { Component } from 'react'
import axios from 'axios';
import auth from './auth';
const api = axios.create({
 baseURL:"http://127.0.0.1:8000/api/login"    
});
export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: null,
            password: null,
            utilisateur: "",
            success: true,
            load: false,
            message: "",
            token: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        });

    }
    handleSubmit(event) {
        event.preventDefault();

        const utilisateur = {
            login: this.state.login,
            password: this.state.password
        }
        this.sendData(utilisateur);
    }
    async sendData(utilisateur) {
        this.setState({
            load: true
        })
        await api.post('/', utilisateur)
            .then(response => this.setState({
                success: response.data.success,
                utilisateur: response.data.utilisateur,
                message: response.data.message,
                token: response.data.token
            }));
        if (this.state.success) {

            auth.role(this.state.utilisateur.role);
            if (this.state.utilisateur.role === "admin") {
                auth.login(
                    () => {
                        localStorage.setItem("Authorization", 'Bearer ' + this.state.token);
                        localStorage.setItem("token", this.state.token);
                        this.props.history.push('/homeStatistique');
                    }
                );

            } else if (this.state.utilisateur.role === "spectateur") {
                auth.login(
                    () => {
                        localStorage.setItem("Authorization", 'Bearer ' + this.state.token);
                        localStorage.setItem("token", this.state.token);
                        this.props.history.push('/afficherStatistique');
                    }
                );
            }

        }
        this.setState({
            load: false
        });
        setTimeout(() => {
            this.setState({
                message: "",
                success: true
            });
        }, 4000);


    }
    render() {
   
        return (
            <div>
                { this.state.load? <div className="  spinner-border position-absolute fixed-top" role="status">
                    <span className="sr-only">Loading...</span>
                </div>:null}
                <div className="container">
                    {!this.state.success?<div className="alert alert-danger">
                        {this.state.message}
                    </div>:null
                    }

                    <div className="row justify-content-center">
                        <div className="col-10 col-sm-12 col-lg-6 col-md-10">
                            <div className="card" style={{backgroundColor:"#F2F2F2"}}>
                                <div className="card-title pt-2 bg-Lightblue mr-5 ml-5 mt-2">
                                    <div >
                                      <strong>Bienvenu Dans votre espace</strong>  
                                    </div>
                                     <div>
                                       <strong>de</strong> 
                                    </div>
                                     <div>
                                       <strong> Gestion des articles du magasin el makhzoune </strong>
                                     </div>
                                        
                                </div>
                                <div>

                                </div>
                                <div className="card-body pb-5 pr-4 pl-4">

                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group p-3">
                                            <label htmlFor="login">Login</label>
                                            <input type="text" name="login" id="login" className="form-control"
                                                placeholder="Login ..." value={this.login}
                                                onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group p-3">
                                            <label htmlFor="password">Password</label>
                                            <input type="text" name="password" id="password" className="form-control"
                                                placeholder="password ..." value={this.password}
                                                onChange={this.handleChange} />
                                        </div>
                                        <div className="row justify-content-around mt-4">
                                        <div className="col-11">
                                        <button type="submit" style={{width:"100%"}} className="btn bg-Lightblue">login</button>
                                        </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage
