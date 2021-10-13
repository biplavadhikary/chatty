import { Theme } from "@material-ui/core";

const homeStyles = (_theme: Theme) => ({
    homeContainer: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        width: "calc(20vw + 20vh)",
        maxWidth: 330,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        background: "white",
        padding: 20,
        marginTop: 30
    },
} as const)

export default homeStyles;