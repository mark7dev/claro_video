import React, { Component } from 'react'
import request from 'superagent';
import './Styles/Item.css';

export default class Item extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: {},
            date: "",
            ranking: {},
            media: {},
            country: "",
            genres: [],
            language: "",
            code: ""         
        }


        const APIItem = `https://mfwkweb-api.clarovideo.net/services/content/data?device_id=web&device_category=web&device_model=web&device_type=web&format=json&device_manufacturer=generic&authpn=webclient&authpt=tfg1h3j4k6fd7&api_version=v5.86&region=mexico&HKS=m9kpsvofksdglsl494resh4h16&group_id=${this.props.match.params.id}`
        request
        .get(APIItem)
        .then(response => {
            this.setState({ 
                item: response.body.response.group.common,
                ranking: response.body.response.group.common.ranking,
                media: response.body.response.group.common.extendedcommon.media,
                country: response.body.response.group.common.extendedcommon.media.countryoforigin.desc,
                language: response.body.response.group.common.extendedcommon.media.language.original.desc,
                genres: response.body.response.group.common.extendedcommon.genres.genre,
                code: response.body.response.group.common.extendedcommon.media.rating.code
            })
            let date = response.body.response.group.common.date;
            if(date.length > 10) {
                date = date.slice(6,8)+'/'+date.slice(4,6)+'/'+date.slice(0,4);
                this.setState({ date: date })
            } else {
                this.setState({ date: date })
            }
        })
        .catch(error => {
            console.log(error);
        })

    }

    render() {
        return (
            <div>
                <div style={{backgroundImage: `url(${this.state.item.image_background})`}} className="cardItem">
                    <h3 className="cardItem__title">{ this.state.item.title }</h3>
                    <div className="cardItem__content__container">
                        <img className="imageItem" src={ this.state.item.image_large } alt={ this.state.item.image_large_alt }/>
                        <div className="cardItem__content">
                            <p className="item__title">{ this.state.media.originaltitle }</p>
                            <span>{ this.state.country }</span>
                            
                            <span className="bolder">{ this.state.date }</span>
                            <span className="bolder">{ this.state.item.duration }</span>
                            <span className="black bolder">{ this.state.language }</span>
                            <span className="black bolder">{ this.state.code }</span>
                            <div className="item__genre__container">
                            {
                                this.state.genres.map((genre, index) => {
                                    return (
                                        <span key={index} className="item__genre">
                                            {genre.desc}
                                        </span>
                                    )
                                })
                            }
                            </div>
                            <p>{ this.state.item.large_description }</p>
                            <div className="ranking__container">
                                <i className="fa fa-eye" aria-hidden="true"></i>
                                <p>{ this.state.ranking.views_count }</p>
                                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                <p>{ this.state.ranking.votes_count}</p>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <p>{ this.state.ranking.average_votes}</p>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        )
    }
}

