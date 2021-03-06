import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Toolbar, Container, Paper, Menu, MenuItem, MenuList, Button, Typography} from '@material-ui/core';
import navBarStyles from '../../styles/navBarStyles';

function StudentPortalNavBar(props) {
    const classes = navBarStyles();
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
            <Toolbar className={classes.toolbar}>
                <Container className={classes.menuButton}>
                    {/* aria-controls indicates to open menu */}
                    <Button disableRipple variant="contained" color="secondary"
                        aria-controls="menu" aria-haspopup="true"
                        onClick={handleOpenMenu} style={{position:"relative"}}
                    >
                        Menu
                    </Button>
                    <Paper>
                        <Menu id="menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} 
                            onClose={handleMenuClose} className={classes.menu}
                        >
                        {/* close list when an element is clicked */}
                            <MenuList>
                                <Link to="/student/portal/account" className={classes.menuItem}>
                                    <MenuItem onClick={() => handleMenuClose("myAcc")}>My Account</MenuItem>
                                </Link>
                                <Link to="/student/portal/class-schedule" className={classes.menuItem}>
                                    <MenuItem onClick={() => handleMenuClose("classSchedule")}>Class Schedule</MenuItem>
                                </Link>
                                <Link to="/student/" className={classes.menuItem}>
                                    <MenuItem>Log Out</MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>
                    </Paper>
                </Container>

                <Link to="/student/portal/account" className={classes.title}>
                    <Button variant="text" color="primary" aria-label="Teacher Portal" onClick={() => handleMenuClose("myAcc")} >
                        <Typography variant="h5">STUDENT PORTAL</Typography>
                    </Button>
                </Link>
            </Toolbar>
        </div>
    );
}

export default StudentPortalNavBar;