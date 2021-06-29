import React, { Component } from 'react';
import {CardMedia} from '@material-ui/core';

class PokeApi extends Component {
    constructor() {
        super()

        this.state = {
            sprite:"",
        }
    }

    componentDidMount() {
        this.getRandomPokemon()
    }
    
    getRandomPokemon = async () => {
        try {
            const random = Math.floor(Math.random() * (1,899));
            console.log(random);
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
            const data = await res.json();

            const sprite = data.sprites.other["official-artwork"].front_default;
            console.log(sprite)
            this.setState({sprite});
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                {!this.state.sprite ? "" 
                : <CardMedia alt="random pokemon" component="img"
                    image={this.state.sprite} className={classes.pokemon}/>
                }
            </div>
        );
    }
}

export default PokeApi;