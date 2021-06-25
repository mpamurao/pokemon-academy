import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Toolbar, Paper, Menu, MenuItem, MenuList, Button} from '@material-ui/core';

function TeacherPortalNavBar(props) {
    // anchor is initial position of menu
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        // set the element that was clicked as the anchor
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = (menuItem) => {
        setAnchorEl(null);
        // console.log(menuItem)
        props.setCurrentPage(menuItem);
    }
    return (
        <div>
            {/* make navBar with buttons */}
            <Toolbar>
                {/* aria-controls indicates to open menu */}
                <Button disableRipple variant="contained" color="secondary"
                    aria-controls="menu" aria-haspopup="true"
                    onClick={handleOpenMenu} style={{position:"relative"}}
                >
                    Profile
                </Button>
            

                <Paper>
                    <Menu id="menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} 
                    onClose={handleMenuClose} style={{margin:"5rem 0rem 0rem 5rem"}}
                    >
                    {/* close list when an element is clicked */}
                        <MenuList>
                            <Link to="/teacher/portal/account">
                                <MenuItem onClick={() => handleMenuClose("myAcc")}>My Account</MenuItem>
                            </Link>
                            <Link to="/teacher/portal/class-roster">
                                <MenuItem onClick={() => handleMenuClose("classRoster")}>Class Roster</MenuItem>
                            </Link>
                            <Link to="/teacher/">
                                <MenuItem>Log Out</MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                </Paper>
            </Toolbar>
        </div>
    );
}

export default TeacherPortalNavBar;