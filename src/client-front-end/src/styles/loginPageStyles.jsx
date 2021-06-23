const loginPageStyles = {
    welcome: {
        // border: "1px solid blue",
        display:"flex",
        flexFlow:"row wrap",
        alignContent:"flex-start",
        fontWeight:"bold",
        width:"50vw",
        padding:"2rem 0rem 1rem 0rem",
    },
    loginPage: {
        border:"4px outset rgb(230,0,0)",
        width:"50vw",
        textAlign:"center",
        display:"flex",
        flexFlow:"column",
        justifyContent:"center",
        marginBottom:"2rem",

    },
    button: {
        // border:"3px outset rgb(230,0,0)",
        width:"50%",
        padding:"0.5rem",
        fontSize:"12pt",
        fontWeight:"bold",
    },
    buttonFocused: {
        // border:"3px outset rgb(230,0,0)",
        width:"50%",
        padding:"1rem",
        fontSize:"12pt",
        fontWeight:"bold",
        color:"rgb(230,0,0)",
        margin:"0",
        backgroundColor:"rgb(230,230,230)",
    },
    form: {
        // border:"1px solid blue",
        display:"flex",
        flexFlow:"column wrap",
        alignContent:"center",
        margin:"2%",
    },
    formFields: {
        // border:"1px solid green",
        width:"50%",
        margin:"0.5rem 0rem 0.5rem 0rem",
    },
    buttonSubmit: {
        color:"white",
        backgroundColor:"rgb(210,0,0)",
        width:"25%",
    },
    notice: {
        // border:"1px solid black",
        padding:"1rem",
        fontWeight:"bold",

    }
}

export default loginPageStyles;