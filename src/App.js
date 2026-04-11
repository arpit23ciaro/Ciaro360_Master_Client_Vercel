import "./App.css";
import { Box } from "@mui/material";
import PublicRoutes from "./routes/public route/PublicRoutes";
import '@fontsource/poppins'; // Defaults to weight 400


function App() {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <PublicRoutes />
    </Box>
  );
}
export default App;
