import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Toolbar, Paper, Menu, MenuItem, MenuList, Box, Grid, Button} from '@material-ui/core';

const NavBarArr = ["Profile", "Class Roster"]

function TeacherPortalNavBar(props) {
    // anchor is initial position of menu
    const [anchor, setAnchor] = useState(null);

    const handleOpenMenu = (event) => {
        // set the element that was clicked as the anchor
        setAnchor(event.currentTarget);
    }

    const handleMenuClose = (event) => {
        setAnchor(null);
    }
    return (
        <div>
            {/* make navBar with buttons */}
            <Toolbar>
                {/* aria-controls indicates to open menu */}
                <Button disableRipple variant="contained" color="secondary"
                    aria-controls="menu"
                    onClick={handleOpenMenu}>
                    Profile
                </Button>
            </Toolbar>
            <Paper>
                <Menu id="menu" anchor={anchor} open={Boolean(anchor)} 
                onClose={handleMenuClose}
                style={{margin:"4rem 0rem 0rem 0.6rem"}}>
                    {/* close list when an element is clicked */}
                    <MenuList onClick={handleMenuClose}>
                        <MenuItem>My Account</MenuItem>
                        <MenuItem>Class Roster</MenuItem>
                        <MenuItem>Log Out</MenuItem>
                    </MenuList>
                </Menu>
            </Paper>
        </div>
    );
}

export default TeacherPortalNavBar;