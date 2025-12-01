import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0D47A1", // Deep Blue
    },
    error: {
      main: "#D32F2F", // Red
    },
    success: {
      main: "#2E7D32", // Green
    },
    background: {
      default: "#F4F6F8", // Light Gray
      paper: "#FFFFFF",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 1,
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 1,
      },
    },
  },
});

export default theme;
