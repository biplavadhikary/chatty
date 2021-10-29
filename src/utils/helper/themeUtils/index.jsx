import { createTheme } from "@material-ui/core/styles";
import { green, indigo } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: green,
    secondary: indigo,
    text: {
      primary: "#fff",
      secondary: "#c0c0c0",
    },
  },
});

export default theme;
