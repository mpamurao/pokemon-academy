const classRosterStyles = {
    classRoster: {
        // border:"3px solid purple",
        width:"100%",
        display:"grid",
        grid:"repeat (2, 1fr) / 1",
        paddingBottom:"3rem"
    },
    button: {
        // border:"3px outset rgb(230,0,0)",
        width:"20%",
        padding:"0.5rem",
        margin:"0.5rem",
        fontSize:"12pt",
        fontWeight:"bold",
    },
    buttonFocused: {
        // border:"3px outset rgb(230,0,0)",
        width:"20%",
        padding:"0.5rem",
        margin:"0.5rem",
        fontSize:"12pt",
        fontWeight:"bold",
        color:"rgb(230,0,0)",
        backgroundColor:"rgb(230,230,230)",
    },
    classView: {
        // border:"2px solid red",
        width:"100%",
        margin:"0",
        padding:"0",
        display:"flex",
        flexFlow:"row wrap",
        justifyContent:"center",
    },
    instructions: {
        margin:"0.5rem 0rem 1rem 0rem"
    },
    tableDisplay: {
        width:"90%",
        // border:"2px solid red",
    },
    root: {
        '& .courseInfo': {
            display:'flex',
            justifyContent:"center"
        }
    },
    buttonTable: {
        // border:"3px outset rgb(230,0,0)",
        width:"12rem",
        // padding:"0.5rem",
        marginTop:"0.5rem",
        fontSize:"12pt",
        // fontWeight:"bold",
    },

}

export default classRosterStyles;