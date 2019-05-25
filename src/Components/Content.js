import React, { Component } from 'react';
import './Styles/Content.css';
import request from 'superagent';
import { Link } from 'react-router-dom';


export default class Content extends Component {

    constructor () {
        super();
    
        this.state = {
          items: [],
          results: [],
        };
    }

    componentDidMount() {
        const APIContent = 'https://mfwkweb-api.clarovideo.net//services/content/list?api_version=v5.86&authpn=webclient&authpt=tfg1h3j4k6fd7&format=json&region=mexico&device_id=web&device_category=web&device_model=web&device_type=web&device_so=chrome&device_manufacturer=generic&HKS=m9kpsvofksdglsl494resh4h16&quantity=40&order_way=DESC&order_id=200&level_id=GPS&from=0&node_id=43864'
        request
        .get(APIContent)
        .then( response => {
            this.setState({
                items: response.body.response.groups,
                results: response.body.response.groups
            })
        })
        .catch( error => {
            console.log(error);
        })
    }

    searchingItem = (e) => {
        let itemSearched = e.target.value.toLowerCase();
        let results = this.state.items.filter(item => item.title.toLowerCase().search(itemSearched) !== -1 );
        this.setState({ results })
    }

    

    render() {
        return (
            <div>
                <div className="search__container"> 
                    <label>Buscar</label>
                    <input 
                        type="text" 
                        onChange={ this.searchingItem }
                        name="nameItem"
                        placeholder="¿Qué película deseas?"
                    />
                </div>
                <div className="content__container">
                    {
                        this.state.results.map((item, index) => {
                            return (
                                
                                <div key={index} className="card">
                                    <Link to={`/${item.id}`}>
                                        <img src={item.image_small} alt=""></img>
                                    </Link>
                                </div>
                                
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}



