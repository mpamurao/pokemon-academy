import { makeStyles } from "@material-ui/core";

const headerStyles = makeStyles(() => ({
    header: {
        width:"100%",
        backgroundColor:"red",
        color:"rgb(250,250,250)",
        padding: "1rem",
        textShadow: "1px 1px 1px black",
        display:"flex",
        justifyContent:"center",
        borderBottom:"3px solid black"
    },
    pokeballLogo: {
        margin:"0.8% 0% 0% 1%",
    }
}))

export default headerStyles;