import { Theme } from "@material-ui/core";

const homeStyles = (theme: Theme) => ({
    homeContainer: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    messageArea: {
        boxSizing: "border-box",
        height: 50,
        width: 500,
        padding: theme.spacing(2, 2),
    },
    messageSuccess: {
        color: "#b2d0b2 !important"
    },
    form: {
        width: "calc(20vw + 20vh)",
        maxWidth: 330,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        background: "white",
        padding: 20,
        marginTop : theme.spacing(20),
        borderRadius: 10
    },
    informationText: {
        color: "white",
    },
    progressWrapper: {
        margin: theme.spacing(10, 15)
    }
} as const)

export default homeStyles;