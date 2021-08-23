import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2'
import axios from 'axios';
axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization");
const api = axios.create({
    baseURL:"http://127.0.0.1:8000/api/statistique"
});
export class AfficherFournitureTopDemandes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            values:[],
            load:true
        };
    }
    componentDidMount() {
        this.getFourniture();
    }

    async  getFourniture() {
        api.get('/fournituretopdemandes')
            .then(Response => this.setState({
                labels: Response.data.labels,
                values:Response.data.values,
                load:true
        }))
 }
    render() {
        
        return (
            <div  className="p-2 m-2" >
                {this.state.load ? 
              <Bar
                        data={{
                            labels: this.state.labels,
                            datasets: [
                                {
                                    label: 'top fourniture demander',
                                    data: this.state.values,
                                        barThickness:20,
                                       
                                }
                            ]
                        }}
                        height={200}
                        options={{
                            maintainAspectRatio: false,      
                        }}
                />
              : null}
            </div>
        )
    }
}

export default AfficherFournitureTopDemandes
