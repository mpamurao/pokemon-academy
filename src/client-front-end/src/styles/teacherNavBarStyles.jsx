import { makeStyles } from "@material-ui/core";

const teacherNavBarStyles = makeStyles(() => ({
    toolbar: {
        width:"100%",
        color:"rgb(250,250,250)",
        // border:"3px solid purple",
        padding: "1rem",
        textShadow: "1px 1px 1px black",
        display:"flex",
        justifyContent:"left",
        borderBottom:"3px solid black"
    },
    menuButton: {
        // border:"1px solid green",
        position:"relative",
        width:"auto",
        padding:"0",
        margin:"0",
    },
    menu: {
        marginTop:"5.7rem",
        position:"absolute",
        "@media (max-width:600px)": {
            marginTop:"6.8rem",
        }
    },
    menuItem: {
        textDecoration:"none",
    },
    title: {
        // border:"3px solid purple",
        marginLeft:"1rem",
        position:"relative",
        textDecoration:"none",
    },

}));

export default teacherNavBarStyles;