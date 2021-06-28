import React from 'react';
import { Typography, Avatar } from '@material-ui/core';
import headerStyles from '../styles/headerStyles';
import pokeball from "./images/favicon.jpg";

function Header(props) {
    const classes = headerStyles();
    return (
        <div className={classes.header}>
            <Typography variant="h3" gutterBottom>
                Pokemon Academy
            </Typography>   
            <Avatar alt="pokeball" 
                src={pokeball} className={classes.pokeballLogo}/>
            
        </div>
    );
}


// img source: https://pixabay.com/vectors/pokemon-pokeball-pokemon-go-1536849/
export default Header;